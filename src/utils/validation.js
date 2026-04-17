


const validateUser = (email, password, role) => {

    const emailRegex = /^\S+@\S+\.\S+$/;
    

    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    
    if (!emailRegex.test(email)) return "Некоректний формат Email";
    if (!passRegex.test(password)) return "Пароль занадто слабкий (мінімум 8 символів, велика та мала літери, цифра)";
    
  
    const allowedRoles = ['author', 'reader', 'admin'];
    if (role && !allowedRoles.includes(role)) return "Некоректна роль";
    
    return null; 
};

module.exports = { validateUser };