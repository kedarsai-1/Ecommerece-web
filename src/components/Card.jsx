const Card =(props)=>{
    const {bannerUrl,name,address,category} = props;
    return(
     <>
   
        <div className="m-4 p-4 w-[300px] rounded-lg bg-gray-100 hover:bg-gray-200">
        <img
          src={bannerUrl}
          className="rounded-lg w-full h-[150px] object-cover"
          alt={name}
        />
        <h3 className="font-bold py-4 text-lg">{name}</h3>
        <p>{address}</p>
  
        
      </div>
      </>
    )

}
export default Card;