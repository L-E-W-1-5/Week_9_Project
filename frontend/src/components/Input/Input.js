import React, {useEffect} from 'react'
import './Input.css'
import { useForm } from "react-hook-form";

// Input component creates two forms using using react hook form and data is used in handleNewObjct function (from app component) -- no need for state

export function Input(props) {

    const {
        register,
        handleSubmit,
        reset, 
        formState: { errors }
      } = useForm();

      

  useEffect(() => {

        reset()
    
  }, [props.language, reset])

//   useEffect(() => {
//        // reset the entire form after component mount or form defaultValues is ready
//       reset({
//          fieldA: "test", // TODO: Check if this is a better dependency for the useEffect
//          fieldB: "test"
//        });
//      }, [reset])

 

  const onSubmit = (data) => {
    props.handleNewObject(data);
    props.visibility()
    reset()
  };

    return (
    <div className="form-items">

            <button className="exitButton" onClick={props.visibility}>X</button>

        <form className="form-input-container" onSubmit={handleSubmit(onSubmit)}>

                {props.language !== "englishDefinitions" && 

                <div className="form-inputs">

                    <label>English Title</label>

                    <input 
                        type="text" 
                        name="englishtitle" 
                        {...register("englishtitle", {
                            required: props.required,
                            minLength: 3
                        })} 
                        defaultValue={props.wholeEditObject.englishtitle}>
                    </input>
                </div>}

                {errors.englishtitle && errors.englishtitle.type === "required" && (
                    <p className='error'>Title must not be blank</p>
                )}
                {errors.englishtitle && errors.englishtitle.type === "minLength" && (
                    <p className='error'>Title must have at least 4 characters</p>
                )}

                <div className="form-inputs">
                <label>Title</label> 
                <input 
                    type="text" 
                    name="title" 
                    {...register("title", {
                        required: props.required,
                        minLength: 3, 
                    })} 
                    defaultValue={props.wholeEditObject.title}>
                </input> 
                {errors.title && errors.title.type === "required" && (
                    <p className='error'>Title must not be blank</p>
                )}
                {errors.title && errors.title.type === "minLength" && (
                    <p className='error'>Title must have at least 4 characters</p>
                )}
                </div>

                <div className="form-inputs">
                <label>Definition</label>
                <input 
                    type="text" 
                    name="definition" 
                    {...register("definition", {
                        required: props.required,
                        minLength: 20
                    })} 
                    defaultValue={props.wholeEditObject.definition}>
                </input>
                {errors.definition && errors.definition.type === "required" && (
                    <p className='error'>Definition must not be blank</p>
                )}
                {errors.definition && errors.definition.type === "minLength" && (
                    <p className='error'>Definition must have at least 20 characters</p>
                )}
                </div>

                <div className="form-inputs">
                <label>Example</label>
                <input 
                    type="text" 
                    name="example" {...register("example", {
                        required: props.required,
                        minLength: 10
                    })} 
                    defaultValue={props.wholeEditObject.example}>
                </input>
                {errors.example && errors.example.type === "required" && (
                    <p className='error'>Example must not be blank</p>
                )}
                {errors.example && errors.example.type === "minLength" && (
                    <p className='error'>Example must have at least 10 characters</p>
                )}
                </div>

                <div className="form-inputs">
                <label>Links</label>
                <input 
                    type="text" 
                    name="links" {...register("links", {
                        required: props.required,
                        minLength: 10
                    })} 
                    defaultValue={props.wholeEditObject.links}>
                </input>
                {errors.links && errors.links.type === "required" && (
                    <p className='error'>Link must not be blank</p>
                )}
                {errors.links && errors.links.type === "minLength" && (
                    <p className='error'>Link must have at least 10 characters</p>
                )}
                </div>

                <div className="form-inputs">
                <label>Week</label>
                <input 
                    type="number"
                    min="0"
                    max="16"
                    name="week" {...register("week", {
                        required: props.required
                    })} 
                    defaultValue={props.wholeEditObject.week}>
                </input>
                {errors.week && errors.week.type === "required" && (
                    <p className='error'>Week must not be blank</p>
                )}
                </div>

            <div className="add-button-div">
            <button type="submit" className="addButton">Add</button>
            </div>
        </form>
    </div>
 )
}
