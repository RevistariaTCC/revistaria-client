interface ISecondStep {
  previous(): void,
  handleSubmit(): void
}

export default function SecondStep({previous, handleSubmit}: ISecondStep){
  return <div></div>
}