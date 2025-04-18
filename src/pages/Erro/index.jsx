import { Link } from "react-router-dom";

function Erro(){
    return(
        <div>
            <h2>Erro, página não encontrada</h2>

            <Link to="/">Voltar a página inicial</Link>
        </div>
    )
}

export default Erro;