type InputProps = {
    Label: string
    InputId: string
    InputType: string
    InputPlaceholder: string
}

export default function Input(props: InputProps) {
    return(
        <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2"> {props.Label} </label>
            <input className="shadow appearance-none border rounded w-full py-2 px-3 cell:h-8 md:h-10  text-gray-700 leading-tight focus:outline-none focus:border-yellow-500 focus:bg-gray-50" id={props.InputId} type={props.InputType} placeholder={props.InputPlaceholder}/>
        </div>
    )
};
