import React from 'react';

const NewProductPage =() => {
    return (
        <div>
            <h1>Novo Produto</h1>
            <form>
                <div>
                    <label htmlFor="nome">Nome do Produto:</label>
                    <input type="text" id="nome" name="nome" />
                </div>
                <div>
                    <label htmlFor="descricao">Descrição:</label>
                    <textarea id="descricao" name="descricao"></textarea>
                </div>
                <div>
                    <label htmlFor="preco">Preço:</label>
                    <input type="number" id="preco" name="preco" />
                </div>
                <button type="submit">Salvar</button>
            </form>
        </div>
    );
};

export default NewProductPage;