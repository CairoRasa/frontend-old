import { Fragment } from 'react';
import Hero from '../components/Hero';
import ItemGrid from '../components/ItemGrid';
import {useQuery} from "react-query";

export default function Home() {
    const homeQuery = useQuery("home", async () => {
        const req = await fetch(`${import.meta.env.VITE_API_URL}/items/`)
        return await req.json();
    }, { refetchOnWindowFocus: false })
  return (
    <Fragment>
      <Hero />
        {homeQuery.isLoading ||  <ItemGrid data={homeQuery.data} />}
    </Fragment>
  );
}
