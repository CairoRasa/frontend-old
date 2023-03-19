import { Fragment } from 'react';
import Hero from '../components/Hero';
import ItemGrid from '../components/ItemGrid';
import {useQuery} from "react-query";

export default function Home() {
    const homeQuery = useQuery("home", async () => {
        const req = await fetch(`http://localhost:5000/items/`)
        return await req.json();
    }, { refetchOnWindowFocus: false })
  return (
    <Fragment>
      <Hero />
        {homeQuery.isLoading ||  <ItemGrid data={homeQuery.data} />}
    </Fragment>
  );
}
