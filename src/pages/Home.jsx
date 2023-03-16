import { Fragment } from 'react';
import Hero from '../components/Hero';
import ItemGrid from '../components/ItemGrid';

export default function Home() {
  return (
    <Fragment>
      <Hero />
      <ItemGrid />
    </Fragment>
  );
}
