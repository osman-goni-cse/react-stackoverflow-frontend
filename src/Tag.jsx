export default function Tag({name, description}){
    return (
        <div className='tag'>
            <h1>{name}</h1>
            <p>{description}</p>
        </div>
    )
}