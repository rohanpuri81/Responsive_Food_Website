import { useEffect, useState } from 'react'
import SearchResult from './components/SearchResult'
import styled from 'styled-components'
import './App.css'

export const BASE_URL="http://localhost:9000";

function App() {

  const [data,setData]=useState(null);
  const [filteredData,setFilteredData]=useState(null);
  const [loading,setLoading]=useState(false);
  const [error,setError]=useState(null);
  const [selectedBtn,setSelectedBtn]=useState("all");

  
  useEffect(()=>{
    const fetchFoodData=async ()=>{
      setLoading(true)
      try{
        const response =await fetch(BASE_URL);
        const json =await response.json();
        setLoading(false);
        
        setData(json)
        setFilteredData(json)
      }catch(err){
        console.log(err)
        setError("Unable to fetch data")
      }
    }
    fetchFoodData();
  },[])

  const searchFood=(e)=>{
    const searchValue = e.target.value;

    if(searchValue==""){
      setFilteredData(null)
    }


    const filter = data?.filter((food)=>food.name.toLowerCase().includes(searchValue.toLowerCase()))
    setFilteredData(filter)
  }
 
  const filterdFood=(type)=>{
      if(type=="all"){
        setFilteredData(data);
        setSelectedBtn("all")
        return
      }
      const filter = data?.filter((food)=>food.type.toLowerCase().includes(type.toLowerCase()))
      setFilteredData(filter)
      // setSelectedBtn(type)
    }

    const  filterBtns=[
      {
        name:"All",
        type:"all"
      },
      {
        name:"Breakfast",
        type:"breakfast"
      },
      {
        name:"Lunch",
        type:"lunch"
      },
      {
        name:"Dinner",
        type:"dinner"
      }
    ]
  

  if(error) return <div>{error}</div>;
  if(loading) return <div>loading</div>;

  return (
    <>
      <Container>
      <TopSection>
        <div className="logo">
          <img src="./logo.svg" alt="logo" />
        </div>
        <div className="search">
          <input 
          type="text"
          onChange={searchFood}
          placeholder='Search Food'
          />
        </div>
      </TopSection>
      <FilterSection>
        {filterBtns.map((val)=>{
          return(
            <Button 
            isSelected={selectedBtn===val.type}
            key={val.name} 
            onClick={()=>{
              filterdFood(val.type)
              
            }} 
            type={val.type}>{val.name}</Button>
          );
        })}
      </FilterSection>
      
    </Container>
      <SearchResult data={filteredData}/>
    </>
  )
}

export default App

export const Container = styled.div`
    max-width: 1200px;
    margin: 0 auto;
`;
const TopSection= styled.section`
   min-height: 140px;
   display: flex;
   justify-content: space-between;
   padding: 16px;
   align-items: center;

   .search input{
    background-color: transparent;
    border: 1px solid red;
    color: white;
    height: 40px;
    font-size: 16px;
    padding: 0 10px;
    border-radius: 5px;
    &::placeholder{
      color: white;
    }
   }

   @media (0 < width < 600px) {
      flex-direction: column;
      min-height: 80px;
   }
`;

const FilterSection= styled.section`
    display: flex;
    justify-content: center;
    gap: 12px;
    padding-bottom: 40px;
    color: white;
    `;
export const Button= styled.button`
   color: white;
   background: ${({isSelected})=>isSelected?"#f22f2f":"#ff4343"};
   border: none;
   border-radius: 5px;
   padding: 6px 12px;
   cursor: pointer;

   &:hover{
    background: #d01919;
   }
`;

