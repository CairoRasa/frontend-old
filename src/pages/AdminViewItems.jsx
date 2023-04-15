import { useQuery } from "react-query";
import Cookies from "js-cookie";
import useAuthStore from "../stores/useAuthStore";
import React from "react";


const ItemCard = React.lazy(() => import("../components/ItemCard"));

export default function AdminViewItems() {
    const itemQuery = useQuery("home", async () => {
        const req = await fetch(`${import.meta.env.VITE_API_URL}/items/`)
        return await req.json();
    }, { refetchOnWindowFocus: false })

    const authStore = useAuthStore();
    authStore.isLoggedIn().then((res) => {
        if (!res) {
            console.log(!res)
            window.location.href = "/login"
            // return <Navigate to="/login" state={{ from: location}} replace />
        }
    })


    return (
        <>
            <div className="p-8 shadow-lg alert">
                <div>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        className="flex-shrink-0 w-6 h-6 stroke-info">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <div>
                        <h3 className="font-bold">CairoRasa Admin Dashboard</h3>
                        <div className="text-xs">Manage Items and Orders here</div>
                    </div>
                </div>
                <div className="flex">
                    <div className="flex-none">
                        <button className="btn btn-sm">Manage Orders</button>
                    </div>
                    <div className="flex-none">
                        <a href="/admin/post" className="btn btn-sm">Post new item</a>
                    </div>
                </div>
            </div>
            <div className="p-8">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
                    {itemQuery.data && itemQuery.data.map((d, idx) => {
                        return (
                            <div key={idx} className="flex flex-col">
                                <React.Suspense fallback={<>...</>}>
                                <ItemCard
                                    image={d.image}
                                    name={d.name}
                                    id={d._id}
                                    description={d.description}
                                    tags={d.tags}
                                />
                                </React.Suspense>
                                <div className="flex flex-row justify-center mt-3 space-x-2">
                                    <a href={`/admin/post/edit/${d._id}`} className="btn btn-sm btn-primary">Edit</a>
                                    <button onClick={async () => {
                                        const sure = confirm("Are you sure about deleting the entry " + d._id +
                                            " with name " + d.name + " ?")
                                        if (sure) {
                                            const res = await fetch(`${import.meta.env.VITE_API_URL}/manage/items/${d._id}`, {
                                                method: "DELETE",
                                                headers: {
                                                    Authorization: `Bearer ${Cookies.get('token')}`,
                                                }
                                            })
                                            if (res.ok && (res.status === 200 || res.status === 201 || res.status === 202)) {
                                                alert(`Item ${d._id} has been deleted`);
                                                window.location.reload();
                                            }
                                        }
                                        console.log(sure)
                                    }} className="btn btn-sm btn-secondary">Delete
                                    </button>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}