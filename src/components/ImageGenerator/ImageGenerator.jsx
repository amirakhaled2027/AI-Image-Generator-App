import React, { useRef, useState} from 'react'
import './ImageGenerator.css';
import main_image from '../Assets/main.jpg';

const ImageGenerator = () => {

  const [image_url, setImage_url] = useState("/");
  let inputRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const imageGenerator = async () => {
    if(inputRef.current.value==="") {
      return 0;
    }
    setLoading(true);
    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method: "POST",
        headers: {
          "Content-Type":"application/json",
          Authorization: 
          "Bearer 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",
          "User-Agent": "Chrome",
        },
        body:JSON.stringify({
          prompt:`${inputRef.current.value}`,
          n:1,
          size: "512x512",
        }),
      }
    );
    let data = await response.json();
    let data_array = data.data;
    setImage_url(data_array[0].url);
    setLoading(false);
  }

  return (
    <div className='ai-image-generator'>
      <div className='header'><span className="main-text">AI Image</span> <span className='generator'>Generator</span></div>
      <div className="img-loading">
        <div className="image">
          <img src={image_url==="/"?main_image:image_url} alt="" />
          <div className="loading">
            <div className={loading?"loading-bar-full":"loading-bar"}>
              <div className={loading?"loading-text":"display-none"}>Loading...</div>
            </div>
          </div>
        </div>
      </div>
      <div className="search-box">
        <input type="text" ref={inputRef} className='search-input' placeholder='Describe what you want to generate....'/>
        <div className="generate-btn" onClick={() => {imageGenerator()}}>
          <button>Generate</button>
        </div>
      </div>
    </div>
  )
}

export default ImageGenerator