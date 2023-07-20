type InputProps = {
    Label: string
    InputId: string
    InputType: string
    InputPlaceholder: string
}

export default function Input(props: InputProps) {
    return(
        <div className="mb-4 w-[80%]">
            <label className="block text-gray-700 text-sm font-bold mb-2"> {props.Label} </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id={props.InputId} type={props.InputType} placeholder={props.InputPlaceholder}/>
        </div>
    )
};
