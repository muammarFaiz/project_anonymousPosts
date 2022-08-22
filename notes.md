notable codes:
1. create root from reactDOM and render the react component, this is also a common place to use the provider component from react-redux to use redux
```js
import React from 'react';
import ReactDOM from 'react-dom/client';
import store from './store'
import { Provider } from 'react-redux';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
```
2. the app.js is the main react component, because this is the component that contain all the other react components so this is where i create the react-router-dom tree using BrowserRouter, route, etc. this is also where i create a react context for functions that i can use for multiple react components.  
in router tree, i can decide which route is available if the user is loged in, etc.  
this component is also the component that show the first ever loading (which many website ignore therefore the user will see a white blinding blank screen when loading) usually from verifying the user login status from server, but to reduce the number of loadings the user will experience, the app.js can also download data that the user will most likely use next, such as images, or informations/data that will be used repeatedly such as user profile data.
```jsx
import './App.css';
import { createContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

export const Context = createContext();

export default function App() {
  const memory = AppLogic();
  const loginStatus = useSelector(state => state.memory.loginStatus)

  return (
    <BrowserRouter>
      {
        loginStatus === 'loading' ?
          <h1>Loading...</h1> :
          <Context.Provider value={memory}>
            <Routes>
              <Route path="/" element={<Ground />}>
                <Route index element={<Home />} />
                {
                  loginStatus === 'ok' ?
                  <>
                    <Route path='profile' element={<Profile />} />
                  </> :
                  <>
                    <Route path="login" element={<Login />} />
                  </>
                }
                <Route path="*" element={<Navigate to={'/'} />} />
              </Route>
            </Routes>
          </Context.Provider>
      }
    </BrowserRouter>
  )
}
```
3. in the appLogic.js a useeffect is used to get the token stored in the browser and verify it to the server, also to get user image if the token is verified, also other functions that i might use for other elments because the return of appLogic will be used as context that cover all the other components but it is not a good idea since appLogic should exclusive to App component, it is better to use a separate logic file for a global logic to avoid unexpected behavior.
```js
useEffect( () => {
  const token = localStorage.getItem('token')
  if(token) {
    // verify token to the server
  } else {
    // do something when the user does not have token
  }
}, [])
useEffect( () => {
  // get image of login status is accepted, i use separete useeffect for this because the first useeffect only run once to check if the user already logged in or not, but this useeffect will run anytime the loginstatus change
}, [loginStatus])
```
4. the axiosSetup.js created to simplify the axios requests with simple error handling so i can use this: `await req('route', ...)` instead of this:
```js
try {
  const result = await axios({
    ...
  })
} catch(err) {
  ...
}
```
5. i make the appGround.jsx for the base react component, the index route "/" and all the other components will be the appGround child that will be displayed/rendered through the react-router-dom <Outlet />. so i can put another components on appGround beside outlet and that component will be shown/rendered wherever route the user pick, topnav is one of those components.
6. one of the most complex useEffect that i made is in cards component, in cardsLogic.jsx to be exact, so what it do in my app basically run the callback everytime one of the four conditions is met: a user create a new secret, delete a secret, initial render, the next page/group of secrets is asked. maybe i should not use a useEffect because it is too complex.  
 the complexity of my useEffect that maybe contain a bit too much of states in it invites one of the most annoying Eslint linter warning in react that is related to useEffect which basically said "incomplete useEffect dependencies, to avoid undetected state changes" they don't care if your useEffect need that dependencies or not they will still show the warning, it cost me so many hours to fixing the side effects caused by including the unneeded state in my dependency which caused the useEffect to be activated more than needed.  
if i remove it from the dependency array the warning will pop up but if i include it the useEffect will run more than needed, so my only solution is to protect the codes in the useEffect callback with an if statement that basically said "run the codes only when homecards is not "loading", i need to remove the cards that is already rendered on screen and replace it with "loading..." before i replace it with the updated array of secrets, because if i just replace the old cards with the new ones it cause error somehow, and again maybe i should not use a useEffect for it becuase it is a bit complicated.
7. using rich text editor to post a secret i use tinyMCE with @tinymce/tinymce-react module.
```jsx
const editorRef = useRef(null);
const [dirty, setDirty] = useState(false)

const editorOnInit = (evt, editor) => editorRef.current = editor
const postSecret = async () => {
  const content = editorRef.current.getContent()
  const res = await req(...)
  if(res === 'ok') {
    setDirty(false)
    editorRef.current.setDirty(false)
  }
}
const initTiny = () => {
  return {
    height: 250,
    width: 600,
    menu: {format: { title: 'Format', items: 'codeformat removeformat' }},
    menubar: 'view insert format',
    toolbar: 'undo redo | bold italic underline strikethrough subscript superscript codeformat blockquote | ' +
      'alignleft aligncenter alignjustify alignright alignnone'
  }
}

return (
  <Editor
    apiKey={process.env.REACT_APP_TINYMCE_APIKEY}
    onInit={editorOnInit}
    onDirty={() => setDirty(true)}
    init={initTiny()}
  />
  <button className="inputsecret-postbutton" onClick={postSecret} disabled={!dirty}>Post</button>
)
```
8. saving audio chunks in blob then display the recorded audio, and if user click send sending it to server, server receive it using multer.  
- `audioMediaRecorder.ondataavailable` push event.data to audioChunks ref not state so it won't rerender every push
- `audioMediaRecorder.onstop` first i stop the recording, then create blob from the audioChunks ref, then create preview from the audio blob to object url using `URL.createObjectURL`
- the `setdirty(true)` is for the send button so user can send the audio, the setSecs(5) is for the auto stop recording to reset.
- the auto stop controled by `setInterval` and `useEffect` and if statement that said "if recordButton is false and `intervalId.current` is false then setInterval each second reduce the secs state by one. (the secs is in useEffect dependency list but it won't trigger any code when it is reduced because the recordButton is false BUT `intervalId.current` is not false/have an id) when the user press stop or the secs reach 0 then it will run the codes that stop recording and everything else `if((recordButton || secs === 0) && intervalId.current) {`
```js
const startRecording = () => {
  navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
    const audioMediaRecorder = new MediaRecorder(stream)

    audioChunks.current = []
    audioMediaRecorder.ondataavailable = event => {
      audioChunks.current.push(event.data)
    }
    audioMediaRecorder.onstop = event => {
      stream.getTracks().forEach(track => track.stop())
      dispatch(mainLoadingSwitch())
      const audioBlob = new Blob(audioChunks.current, {type: audioChunks.current[0].type})
      setAudioElem(
        <>
          <audio src={URL.createObjectURL(audioBlob)} controls></audio>
          <button onClick={removeCurrentAudio}>X</button>
        </>
      )
      setDirty(true)
      setSecs(5)
      dispatch(mainLoadingSwitch())
      setRecordButton(true)
    }
    audioMediaRecorder.start()
    audioRecorder.current = audioMediaRecorder
    setRecordButton(false)
  })
}
const stopRecording = () => {
  if(audioRecorder.current.state !== 'inactive') audioRecorder.current.stop()
}
useEffect(() => {
  if(!recordButton && !intervalId.current) {
    intervalId.current = setInterval(() => {
      setSecs(prev => prev - 1)
    }, 1000);
  }
  if((recordButton || secs === 0) && intervalId.current) {
    console.log('clearinterval running...')
    clearInterval(intervalId.current)
    stopRecording()
    intervalId.current = null
  }
}, [recordButton, secs])

const postSecret = async () => {
  let audioBlob
  if(audioChunks.current.length) audioBlob = new Blob(audioChunks.current, { type: audioChunks.current[0].type })
}
```
9. modifying the uploaded image using canvas.  
steps:  
- create file reader and read `readAsDataURL` the file that the user send in input
- once readed, create img element with the src = the fileReader onload callback param `e.target.result`
- once img is loaded, create canvas element and set canvas height and width
- create context from `canvas.getContext('2d')` and then `context.drawImage` with the desired image, image position, image size. the desired image is the img element that created with src from fileReader
- and get the dataurl from `canvas.toDataURL(imgToEdit.type)` which you can use for img preview and send to server  
answers:
- yes the `imgDrawing` is never shown to the user, but there is another img that is shown with src from `canvas.toDataURL()` which is the modified image created in `imgDrawing.onload`
- the context from `canvas.getContext` works like that, idk why tho
```js
const imgOnchange = v => {
    const imgToEdit = v.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(imgToEdit)
    reader.onload = e => {
      const imgDrawing = document.createElement('img')
      imgDrawing.src = e.target.result
      imgDrawing.onload = ev => {
        const canvas = document.createElement('canvas')
        const imgHeight = HEIGHT
        const reducedPercentage = HEIGHT * 100 / imgDrawing.height
        const imgWidth = imgDrawing.width * reducedPercentage / 100
        canvas.width = WIDTH
        canvas.height = HEIGHT
        const xHeight = 0
        const xWidth = imgWidth > WIDTH ? ((imgWidth - WIDTH) / 2) * -1 : (WIDTH - imgWidth) / 2
        const context = canvas.getContext('2d')
        context.drawImage(imgDrawing, xWidth, xHeight, imgWidth, imgHeight)
        const dataurl = canvas.toDataURL(imgToEdit.type)
        imgPreview.current.src = dataurl
        setModifiedImg({
          originalname: imgToEdit.name,
          mimetype: imgToEdit.type,
          base64: dataurl,
          size: imgToEdit.size,
          lastmodified: imgToEdit.lastModified
        })
      }
    }
  }
```
10. 