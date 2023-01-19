import React,{useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Holder = () => {

    const lowercaseList = 'abcdefghijklmnopqrstuvwxyz';
    const uppercaseList = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbersList = '0123456789';
    const symbolsList = '!@#$%^&*()?';

    const [password,setPassword] = useState('');
    const [lowercase, setLowercase] = useState(true);
    const [uppercase, setUppercase] = useState(true);
    const [symbols, setSymbols] = useState(true);
    const [numbers, setNumbers] = useState(true);
    const [passwordlength, setPasswordlength] = useState(8);

    const genPass = () => {
        let charList = '';
        if (lowercase){
            charList+= lowercaseList;
        }
        if (uppercase){
            charList+= uppercaseList;
        }
        if (symbols){
            charList+= symbolsList;
        }
        if (numbers){
            charList+= numbersList;
        }

        let tempPassword = '';
        const charListLength = charList.length;

        for (let i=0;i<passwordlength;i++){
            const charListIndex = Math.round(Math.random()*charListLength);
            tempPassword += charList.charAt(charListIndex);
        }
        console.log(tempPassword);

        setPassword(tempPassword);
    }

    let boxStyle = {
        backgroundColor: "#dfdfdf",
        border: "0px",
        borderRadius: "12px",
        width: "512px"
    }
    let boxStyle1 = {
        backgroundColor: "white",
        border: "0px",
        borderRadius: "4px",
        padding:"10px"
    }
    let boxStyle2 = {
        backgroundColor: "white",
        border: "0px",
        borderRadius: "4px 0px 0px 4px",
        padding:"10px"
    }

    const copyPassword = async ()=> {
        const copiedText = await navigator.clipboard.readText();
        if (password.length){
            navigator.clipboard.writeText(password);
            toast.success('Copied to clipboard', {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
            
        }
    }

    return (
        <>
            <div className='container p-5 my-5' style={boxStyle}>
                <h5 className='my-4 text-center'>Password</h5>
                <div class="input-group my-4">
                    <input type="text" class="form-control" aria-describedby="button-addon2" disabled style={boxStyle2} value={password}/>
                    <button class="btn btn-outline-secondary" onClick={copyPassword} type="button" id="button-addon2">Copy</button>
                </div>
                <div>
                    <label for="customRange1" class="form-label">Password Size</label>
                    <p style={boxStyle1}>{passwordlength}</p>
                    <input type="range" min={8} max={24} defaultValue={passwordlength} onChange={(event)=>setPasswordlength(event.currentTarget.value)} class="form-range" id="customRange1"></input>
                </div>
                <div class="input-group-text my-3">
                    <input class="form-check-input mt-0" type="checkbox" value="" checked={uppercase} onChange={()=>setUppercase(!uppercase)} aria-label="Checkbox for following text input" />
                    <div className='mx-3'>Include Uppercase (A-Z)</div>
                </div>
                <div class="input-group-text my-3">
                    <input class="form-check-input mt-0" type="checkbox" value="" checked={lowercase} onChange={()=>setLowercase(!lowercase)} aria-label="Checkbox for following text input" />
                    <div className='mx-3'>Include Lowercase (a-z)</div>
                </div>
                <div class="input-group-text my-3">
                    <input class="form-check-input mt-0" type="checkbox" value="" checked={symbols} onChange={()=>setSymbols(!symbols)} aria-label="Checkbox for following text input" />
                    <div className='mx-3'>Include Symbols (&-#)</div>
                </div>
                <div class="input-group-text my-3">
                    <input class="form-check-input mt-0" type="checkbox" value="" checked={numbers} onChange={()=>setNumbers(!numbers)} aria-label="Checkbox for following text input" />
                    <div className='mx-3'>Include Numbers (0-9)</div>
                </div>
                <button class="btn btn-primary py-3 px-5 w-100" type="button" onClick={genPass}>Create Password</button>
            </div>
            <ToastContainer />
        </>
    )
}
