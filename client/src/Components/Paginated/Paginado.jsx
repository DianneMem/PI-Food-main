import React from 'react'
import s from './Paginado.module.css';

export default function Paginado(p) {
    return (
        <div className={s.paginated}>
            <button onClick={p.prevPage} id='prevButton' className={s.items}>{'<'}</button>
            <div className={s.texto}>
                <label className={s.pages}>Página {p.page}</label>
            </div>
            <button onClick={p.nextPage} id='nextButton' className={s.items}> {'>'}</button>


        </div>
    )
}
