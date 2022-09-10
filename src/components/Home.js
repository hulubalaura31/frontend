import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import '../App.css';
import { collection, getDocs } from 'firebase/firestore';
import { BiSearchAlt } from 'react-icons/bi';
import { TableWrapper, TableContainer, Container, StyledText, StyledLabel, TableS, TrS, ThS, SearchbarContainer, SearchbarIconsContainer, SearchbarInput } from './styles';
import { useNavigate } from 'react-router-dom';


function Home() {
    const [clients, setClients] = useState([]);
    const navigate = useNavigate();
    const [filteredCleints, setFilteredClients] = useState([]);
    const clientsRef = collection(db, "clients");
    const [query, setQuery] = useState("");

    useEffect(() => {
        const getClients = async () => {
            const data = await getDocs(clientsRef);
            console.log(data);
            setClients(data.docs.map((item) => ({ ...item.data(), id: item.id })))
            setFilteredClients(clients)
            console.log(filteredCleints.length)
            console.log(clients);
        }
        getClients()
    }, []);

    const onPressFilter = (event) => {
        const oString = event.target.value;
        setQuery(oString);
        navigate(`/home/?s=${oString}`)
        event.preventDefault()
        if (query === "") {
            setFilteredClients(clients);
        } else {
            setFilteredClients(clients.filter(x => x.name.toLowerCase().includes(oString.toLowerCase())));
        }
    };

    return (
        <div>
            <SearchbarContainer>
                <SearchbarInput
                    type="text"
                    placeholder="Type any name.."
                    value={query}
                    onChange={onPressFilter}
                />
                <SearchbarIconsContainer>
                    <BiSearchAlt fontWeight='bold' fontSize='40px' color="#9299ff" />
                </SearchbarIconsContainer>
            </SearchbarContainer>
            <Container>
                <TableContainer>
                    <TableWrapper>
                        <TableS>
                            <TrS>
                                <ThS>
                                    <StyledLabel>
                                        Name
                                    </StyledLabel>
                                </ThS>
                            </TrS>
                            {filteredCleints ? filteredCleints.map((client) => (
                                <TrS>
                                    <ThS data-title="Name" key={client.id}>
                                        <StyledText>
                                            {client.name}
                                        </StyledText>
                                    </ThS>
                                </TrS>
                            )) : <></>}
                        </TableS>
                    </TableWrapper>
                </TableContainer>
            </Container>
        </div>
    );
}

export default Home;