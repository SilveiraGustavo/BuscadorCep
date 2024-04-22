import {FiSearch} from 'react-icons/fi';
import './styles.css';
import {useState} from 'react';
import Api from './services/Api';


function App() {
  const [input, setInput] = useState('');
  const [cep, setCep] = useState('');

  async function handleSearch(){
    if(input === ''){
      alert("Prencha o campo!");
      return;
    }

    try{
      const response = await Api.get(`${input}/json`);
      setCep(response.data);
      setInput('');

    }catch{
      alert("Ocorreu algum erro!");
      setInput('');
    }
  }
  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>
      
      <div className="containerInput">
        <input
          type="text"
          placeholder="Digite seu cep"
          value={input}
          onChange={(event)=> setInput(event.target.value) }
        />

        <button className="btnSearch" onClick={handleSearch}> 
          <FiSearch size={25} color='#FFF'/>
        </button>
      </div>

      {Object.keys(cep).length > 0 && (
          <main className='principal'>
            <h2>
              CEP: {cep.cep}
            </h2>
            <span> {cep.logradouro}</span>
            <span> Complemento: {cep.complemento}</span>
            <span> {cep.bairro}</span>
            <span> {cep.localidade} - {cep.uf}</span>
          </main>
        )}
        
        
      
    </div>
  );
}

export default App;
