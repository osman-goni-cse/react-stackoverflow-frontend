import { use } from "react";
import Tag from "./Tag";

export default function TagList({fetchTags}){
    console.log(fetchTags);
    const tags = use(fetchTags);
    return (
        <div className='tag-list'>
            <h2>Number of Tags: {tags.length} </h2>
        {
            tags.map(tag => (
                <Tag key={tag.id} name={tag.name} description={tag.description}></Tag>
            ))
        }
        </div>
    )
    }