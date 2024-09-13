import React, {useEffect, useState} from 'react';

// Constants
import { LOOK_BOOK_LIST_DATA } from './constants/lookBook.constants';

// Components
import Look from '../look';

const LookBook = () => {
    const [ lookBookList, setLookBookList] = useState([]);
    const [ loading, setLoading] = useState(true);
    useEffect(()=>{
        setLookBookList(LOOK_BOOK_LIST_DATA);
        setLoading(false);
    },[]);

    return <>
    <div style={{ textAlign: 'center'}}>LookBookApp</div>
    {loading ? (
        <div>Loading Data...</div>
      ) : (
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-around",
            alignItems: "center",
            minHeight: "100vh",
            columnGap: '5px',
          }}
        >{lookBookList.map(look=>{
            const {id, name, productLink,mediaList } = look;
            return (
              <Look
                id={id}
                name={name}
                productLink={productLink}
                mediaList={mediaList}
              />
            );
        })}</div>)}</>
}

export default LookBook;