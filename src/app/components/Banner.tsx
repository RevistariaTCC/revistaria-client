import SliderComponent from "./SliderComponent";


export default function Banner() {

  const images = [
    "https://revistariabanners.s3.sa-east-1.amazonaws.com/banner_1.png",
    "https://revistariabanners.s3.sa-east-1.amazonaws.com/banner_2.png",
    "https://revistariabanners.s3.sa-east-1.amazonaws.com/banner_3.png"
  ]




  return (
      <SliderComponent slideProps={{infinite: true, slidesToShow: 1}}>
        {images.map((images,index) => (
          <img key={index} src={images} alt="banner" className="rounded container"/>
        ))}
      </SliderComponent>
    )
};
