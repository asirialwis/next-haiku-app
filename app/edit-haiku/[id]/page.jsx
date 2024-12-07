import HaikuForm from "../../../components/HaikuForm"

export default function Page(props){
  return (
    <div>
      <h2 className = "text-center text-4xl text-gray-600 mb-4">Edit Post</h2>
      <HaikuForm action="edit"/>
    </div>
  )
}