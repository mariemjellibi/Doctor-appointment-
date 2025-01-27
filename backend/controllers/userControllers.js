import User from "../models/User.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/helpers/generateTokenAndSetCookie.js"; // Ensure this function exists and works properly

export const signupUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, password,isDoctor } = req.body;

    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "L'utilisateur existe déjà." });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      phone,
      password: hashedPassword,
      isDoctor:isDoctor
    });

    // Save the user to the database
    await newUser.save();
    console.log("New user created:", newUser);

    // Generate token and set cookie
    try {
      generateTokenAndSetCookie(newUser._id, res);
      console.log("Token generated and cookie set successfully.");
    } catch (tokenError) {
      console.error("Error in token generation:", tokenError.message);
      return res
        .status(500)
        .json({ message: "Erreur lors de la génération du token." });
    }

    // Respond with success and user data
    return res.status(201).json({
      _id: newUser._id,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      phone: newUser.phone,
      isDoctor: newUser.isDoctor,
    });
  } catch (error) {
    console.error("Erreur lors de l'inscription de l'utilisateur :", error.message);

    // Differentiate between validation and server errors
    if (error.name === "ValidationError") {
      return res
        .status(400)
        .json({ message: "Données utilisateur invalides." });
    } else {
      return res.status(500).json({ message: "Erreur du serveur." });
    }
  }
};

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Vérification si l'utilisateur existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Vérification du mot de passe
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Génération du token JWT
        generateTokenAndSetCookie(user._id, res);  // Cette fonction génère un token et le place dans le cookie

        // Envoi de la réponse avec les informations de l'utilisateur
        res.status(200).json({
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            phone: user.phone,
        });

    } catch (e) {
        res.status(500).json({ message: e.message });
        console.log("Erreur lors de la connexion de l'utilisateur :", e.message);
    }
};
// export const logoutUser = async(req,res)=>{
//     try{
//        res.cookie("jwt","",{maxAge:1});
//        res.status(200).json({message:"Déconnexion réussie"});

//     }catch(e){
//         res.status(500).json({ message: e.message });
//         console.log("Erreur lors de la déconnexion de l'utilisateur :", e.message);
//     }
// };
// 

export const updateUser = async (req, res) => {
    const { name, username, email, password, profilePic, bio } = req.body;
    const userId = req.user._id;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        // Si on veut mettre à jour le mot de passe
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            user.password = hashedPassword;
        }

        // Mise à jour des autres champs
        user.name = name || user.name;
        user.username = username || user.username;
        user.email = email || user.email;
        user.profilePic = profilePic || user.profilePic;
        user.bio = bio || user.bio;

        await user.save();
        res.status(200).json({ message: "Utilisateur mis à jour avec succès" });
    } catch (e) {
        res.status(500).json({ message: e.message });
        console.log("Erreur lors de la mise à jour de l'utilisateur :", e.message);
    }
};
