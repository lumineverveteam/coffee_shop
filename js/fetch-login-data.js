async function fetchLoginData(){
    let data
    try{
        let response=await fetch('login.json')
        if(!response.ok) throw new Error(`an error occurred `)
        data= await response.json()
    }catch(err){
console.log('error:',err);
    }
    
return data
}
fetchLoginData().then((data) => {
    if (data) {
      console.log('Fetched data:', data);
    }
    else{
        console.log('error');
    }
  });
export default fetchLoginData;