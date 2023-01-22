import { TextField } from "../atom/TextField";
import { Button } from "../atom/Button";
import { useRef, useState} from "react";
import {commentsUrl} from "../../lib/api-url";

export const CommentForm = ({updateComments}) => {
    // Commentaire - Exercise
    const [error, setError] = useState()
    const formRef = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const comment = formRef.current[0].value;
        const username = formRef.current[1].value;

        const testComment =
            (comment.length >= 10 && comment.length <= 100);
        const testUsername =
            (username.length >= 4 && username.length <= 20);

        if(testUsername && testComment) {
            const body = JSON.stringify({
                comment,
                username
            })
            fetch(commentsUrl, {method:"POST", body}).then(async(res) => {
                const json = await res.json();
                if(res.ok) {
                    updateComments();
                    event.target.reset()
                } else {
                    setError("Something wrong " + String(json))
                }
            }).catch((e) => {
                setError("Something wrong " + String(e))
            })

        } else {
            setError("Not ok !")
        }
    }

    return (
        <form onSubmit={handleSubmit} ref={formRef} className="flex flex-col gap-4 w-full md:px-8">
            <TextField
                label="Commentaire"
                id="username"
                name="username"
                type="text"
                placeholder="Username"
            />

            <TextField
                label="Username"
                id="comment"
                name="comment"

                type="text"
                placeholder="Username"
                component="textarea"
            />
            {error ? <p className={"text-red-800"}>error</p>:null}
            <Button type="submit">Submit</Button>
        </form>
    );
};
