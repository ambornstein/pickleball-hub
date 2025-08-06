//config.ts
//Declaration of widely used configuration and validation utilities

export const emailRegex = new RegExp("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
export const passwordRegex = new RegExp("[A-Za-z0-9#?!@$%^&*-]{8,}")