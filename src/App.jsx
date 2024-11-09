import { useState } from 'react';
import { apiKey } from './assets/api_key'; // My API Key
import aiGirlImg from './assets/Girl.jpg' // Default Image
import errorImg from './assets/Error.jpg' // Error Image

// Components
import InputArea from './Components/InputArea';
import Loader from './Components/Loader';

function App() {

  const [text, setText] = useState('');
  const [imgUrl, setImgUrl] = useState(aiGirlImg);
  const [isLoading, setIsLoading] = useState(false)

  // Input Event Handler
  function handleOnChange(event) {
    setText(event.target.value);
  }

  const API = apiKey

  // Function to fetch image
  const getImage = async () => {

    if (text !== '') {
      try {
        setIsLoading(true)

        const options = {
          method: 'POST',
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
            authorization: `Bearer ${API}`
          },
          body: JSON.stringify({
            response_as_dict: true,
            attributes_as_list: false,
            show_base_64: true,
            show_original_response: false,
            num_images: 1,
            providers: ['openai/dall-e-2'],
            text: text,
            resolution: '512x512'
          })
        };

        const response = await fetch('https://api.edenai.run/v2/image/generation', options)
        const data = await response.json()
        const Url = await data["openai/dall-e-2"].items[0].image_resource_url;

        setIsLoading(false)
        setImgUrl(Url)

      } catch (error) {

        setIsLoading(false)
        setImgUrl(errorImg)
        setTimeout(() => setImgUrl(aiGirlImg), 3000)

      }
    } else {
      alert('Please enter some text in input box!')
    }
  };

  return (
    <div id='container'>
      <h1 id='title'>AI image <span className="highlight">generator</span></h1>
      {isLoading && <Loader />}
      {!isLoading && <img src={imgUrl} alt='' />}
      <InputArea handleChange={handleOnChange} text={text} result={getImage} />
    </div>
  )
}

export default App