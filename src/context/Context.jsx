import { createContext, useState } from "react";
import run from "../config/gemini";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input , setInput] = useState(""); //use to save the input Data
    const [recentPrompt , setRecentPrompt] = useState(""); // input field data will be saved in recentPrompt after clickd send button
    const [prevPrompts , setPrevPrompts] = useState([]); // for storing all resent history in recent tab
    const [showResult , setShowResult] = useState(false); // if showResult is true then it will hide the greet text and box and show result
    const [loading , setLoading] = useState(false); // if true then it will display loading animation
    const [resultData , setResultData] = useState(""); // user for display result on our webpages
    


    // Typing Effect
    const delayPara = (index,nextWord) => {
        setTimeout(function(){
            setResultData(prev => prev+nextWord);
        },70*index)
    }

    const newChat = ()=> {
        setLoading(false)
        setShowResult(false)
    }



    const onSent = async (prompt) => {
        
        setResultData("")
        setLoading(true);
        setShowResult(true);
        let response;
        if(prompt !== undefined) {
            response = await run(prompt)
            setPrevPrompts((prev) => [...prev, prompt]);
        }
        else {
            setPrevPrompts(prev => [...prev , input])
            setRecentPrompt(input)
            response = await run(input)
        }
        const responseArray = response.split("**");
        let newResponse= "";
        for(let i = 0; i < responseArray.length; i++)
        {
            if(i === 0 || i%2 == 0) {
                newResponse += responseArray[i];
            }
            else {
                newResponse += "<b>" +responseArray[i]+ "</b>";
            }
        }

        let newResponse1 = newResponse.split("*").join('</br>');

        const newResponseArray = newResponse1.split(" ");
        for(let i = 0; i<newResponseArray.length; i++)
        {
            const nextWord = newResponseArray[i];
            delayPara(i , nextWord+" ")
        }
        setLoading(false);
        setInput("");
    }

    const contextValue = {
        input , 
        setInput,
        recentPrompt ,
        setRecentPrompt,
        prevPrompts ,
        setPrevPrompts,
        showResult ,
        loading ,
        resultData ,
        onSent,
        newChat,
    }

    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>
    )



}
export default ContextProvider