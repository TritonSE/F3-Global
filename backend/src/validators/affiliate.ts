import {body, param} from "express-validator";

//POST
export const createAffiliateValidator = [
    body("name")
        .exists({checkFalsy: true})
        .withMessage("Name is required")
        .bail()
        .isString()
        .withMessage("Name must be a string"),
    
    body("imageUrl")
        .exists({checkFalsy: true})
        .withMessage("Image URL is required")
        .bail()
        .isURL()
        .withMessage("Image URL must be a valid URL"),

    body("order")
        .optional()
        .isInt()
        .withMessage("Order must be an integer"),
];

//PUT
export const updateAffiliatesValidator = [
    body()
        .isArray()
        .withMessage("Body must be an array"),

    body("*.name")
        .exists({checkFalsy: true})
        .withMessage("Name is required")
        .bail()
        .isString()
        .withMessage("Name must be a string"),
        
    body("*.imageUrl")
        .exists({checkFalsy: true})
        .withMessage("Image URL is required")
        .bail()
        .isURL()
        .withMessage("Image URL must be a valid URL"),

    body("*._id")
        .optional()
        .isMongoId()
        .withMessage("_id must be a MongoDB object ID"),

    body("*.order")
        .optional()
        .isInt()
        .withMessage("Order must be an integer"),
]

//DELETE
export const deleteAffiliateValidator = [
    param("id")
        .exists()
        .withMessage("_id is required")
        .bail()
        .isMongoId()
        .withMessage("id must be a valid MongoDB ObjectId"),

]