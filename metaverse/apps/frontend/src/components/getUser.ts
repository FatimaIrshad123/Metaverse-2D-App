import { jwtDecode } from 'jwt-decode';

function getUserRole() {
  const token = localStorage.getItem('token');
  
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode(token);
    console.log(decoded)
    /*if (decoded.role === 'admin'){
        localStorage.setItem('adminToken',decoded.token)
        localStorage.setItem('adminId',response.data.id)
      } else {
        localStorage.setItem('userToken',response.data.token)
        localStorage.setItem('userId',response.data.id)
      }
    return decoded.role;*/
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}