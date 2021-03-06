import { ROLES } from "../models/Role";
import User from "../models/User";

export const checkDuplicateUsernameOrEmail = async (req, res, next) => {
    const user = await User.findOne({username: req.body.username});
    if(user) return res.status(400).json({message: 'User already exists'});

    const email = await User.findOne({email: req.body.email});
    if(email) return res.status(400).json({message: 'Email already exists'});

    next();
};

export const checkRolesExisted = (req, res, next) => {
    if(req.body.roles){
        const bodyRolesLength = req.body.roles.length;
        for(let i = 0; i < bodyRolesLength; i++){
            if(!ROLES.includes(req.body.roles[i])){
                return res.status(400).json({
                    message: `Role ${req.body.roles[i]} does not exists`
                });
            }
        }
    }
    next();
};