import {Fragment, useEffect, useState} from "react";
import useAuthStore from "../stores/useAuthStore";
import handleImageFile from "../utils/handleImageFile";
import {useForm} from "react-hook-form";
import ItemCard from "../components/ItemCard";
import Alert from "../components/Alert";
import {useNavigate} from "react-router-dom";

export default function PostItem() {
    const authStore = useAuthStore();
    const Navigate = useNavigate();
    const { register, handleSubmit, watch} = useForm();
    const [, setUser] = useState(null);
    const [alertMsg, setAlertMsg] = useState(null);
    const [imageB64, setImageB64] = useState("");
    useEffect(() => {
        authStore.currentUser().then((res) => {
            if (!res.is_superuser) {
                // window.location.href = "/login";
                Navigate("/login")
            }
            setUser(res);
        });
    }, [])

    async function handleImageChange(event) {
        const file = event.target.files[0];
        const base64Url = await handleImageFile(file, 800); // Compress the image to a maximum size of 800 pixels and get the base64 URL
        console.log(base64Url); // Do something with the base64 URL, like display the compressed image on your web page or send it to a server
        setImageB64(base64Url);
    }

    const onSubmit = async (data) => {
        data.image = imageB64;
        data.price = Number(data.price);
        data.tags = data.tags.split(" ");
        console.log(data);
        console.log(authStore.token)

        const res = await fetch(`${import.meta.env.VITE_API_URL}/manage/items/`, {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Authorization": "Bearer " + authStore.getToken(),
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        })

        if (res.status !== 200) {
            setAlertMsg("Error: " + res.statusText)
            return
        }

        const resJson = await res.json();
        setAlertMsg("Posted with id: " + resJson._id)
    }

    return (
        <Fragment>
            {/* create a form to submit fooditem with name, description, price, image and category */}
            <div className="m-3 flex flex-col sm:flex-row justify-center items-center mr-8 ml-8">

                <div className="sm:mr-3 sm:max-w-xl">
                    <ItemCard
                        id="#"
                        image={imageB64}
                        description={watch("description", false)}
                        name={watch("name", false)}
                        tags={watch("tags") ? watch("tags").split(" ") : undefined}
                    />
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="form-control">
                    <div className="m-3">{alertMsg && <Alert text={alertMsg}/>}</div>
                    <h1 className="text-3xl font-mono font-bold">Create Food Item</h1>
                    <div>
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <label className="input-group">
                        <span className="text-black font-semibold bg-primary">
                            Name
                        </span>
                            <input
                                {...register("name")}
                                type="text"
                                required
                                name="name"
                                placeholder="Food Name"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Description</span>
                        </label>
                        <label className="input-group">
                        <span className="text-black font-semibold bg-primary">
                            Description
                        </span>
                            <textarea
                                {...register("description")}
                                required
                                name="description"
                                // placeholder="Food Description"
                                className="input input-bordered h-32 w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Price</span>
                        </label>
                        <label className="input-group">
                        <span className="text-black font-semibold bg-primary">
                            Price
                        </span>
                            <input
                                {...register("price")}
                                type="number"
                                required
                                name="price"
                                // placeholder="Food Description"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <label className="input-group">
                            {/*<span className="text-black font-semibold bg-primary">*/}
                            {/*    Image*/}
                            {/*</span>*/}
                            <input
                                onChange={handleImageChange}
                                type="file"
                                accept="image/*"
                                required
                                className="file-input rounded-lg file-input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Category </span>
                        </label>
                        <label className="input-group">
                        <span className="text-black font-semibold bg-primary">
                            Category
                        </span>
                            <input
                                {...register("category")}
                                type="text"
                                required
                                name="category"
                                // placeholder="Food Description"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <div>
                        <label className="label">
                            <span className="label-text">Tags (use each tag with spaces) </span>
                        </label>
                        <label className="input-group">
                        <span className="text-black font-semibold bg-primary">
                            Tags
                        </span>
                            <input
                                {...register("tags")}
                                type="text"
                                required
                                name="tags"
                                // placeholder="Food Description"
                                className="input input-bordered w-full"
                            />
                        </label>
                    </div>
                    <button className="mt-3 btn btn-primary" type="submit">Submit</button>
                </form>
            </div>
        </Fragment>
    )
}