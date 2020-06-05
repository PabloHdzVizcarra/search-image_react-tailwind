import React, {useState, useEffect} from 'react';
import Form from './components/Form'
import ImageList from './components/ImageList'

function App() {

  const [search, setSearch] = useState('');
  const [images, setImages] = useState([]);
  const [actualPage, setActualPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const checkAPI = async () => {
      if (search === '') return;

      const imagesPerPage = 30;
      const key = '16756064-9044bc8c5b2fb508c88ddfe20';
      const url = `https://pixabay.com/api/?key=${key}&q=${search}&per_page=${imagesPerPage}&page=${actualPage}`;

      const response = await fetch(url);
      const result = await response.json();

      setImages(result.hits)

      // calcular el total de paginas
      const calculateTotalPages = Math.ceil(result.totalHits / imagesPerPage);
      setTotalPages(calculateTotalPages);

      // mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView( { behavior: 'smooth' } );
    }
    checkAPI()

  }, [search, actualPage])

  // definir la pagina anterior
  const beforePage = () => {
    const newCurrentPage = actualPage - 1;

    if (newCurrentPage === 0) return;

    setActualPage(newCurrentPage)
  }

  // definir la pagina siguiente
  const afterPage = () => {
    const newCurrentPage = actualPage + 1;

    if (newCurrentPage > totalPages) return;

    setActualPage(newCurrentPage)
  }

  return (
    <div className='container'>
      <div className='jumbotron'>
        <p className='lead text-center'>Buscador de Imagenes</p>

        <Form
          setSearch={setSearch}
        />
      </div>

      <div className="row justify-content-center">
        <ImageList
          images={images}
         />

        { (actualPage === 1 ?
          null
        :
          <button
          type="button"
          className="btn btn-dark mr-1 mb-3"
          onClick={beforePage}
          >&laquo; Anterior</button>
        ) }

        { (actualPage === totalPages ?
         null
        :
         <button
          type="button"
          className="btn btn-dark mb-3"
          onClick={afterPage}
          >Siguiente &raquo;</button>
        ) }

      </div>
    </div>
  );
}

export default App;
