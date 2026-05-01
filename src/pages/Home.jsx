import Cards from '../componentes/Cards';

function Home({ categoryFilter, onAgregarAlCarrito }) {
  return (
    <div>
      <Cards categoryFilter={categoryFilter} onAgregarAlCarrito={onAgregarAlCarrito} />
    </div>
  );
}

export default Home;
