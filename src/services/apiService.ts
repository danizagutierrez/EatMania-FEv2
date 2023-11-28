import axios from 'axios';


  const apiService = {
    dataService: async (data: any, operation: string) => {

      const BASEURL = "http://eatmania-env.eba-ivjnb3d2.us-east-2.elasticbeanstalk.com/api";
      let response : any;

      try {
        switch(operation){
          case "REGISTER":
            response = await axios.post(`${BASEURL}/register`, data);
            console.log(response)
          break;

          case "LOGIN":
            response = await axios.get(`${BASEURL}/login/${data.email}/${data.password}`);
             console.log('Login successful', response.data);
            // Fill here  and cheat register
            break;
            default:
            console.log('Invalid operation');
            break;

      }
            return response;

      } catch (error) {
        console.log(error)
      }



    }
  };

  export default apiService;