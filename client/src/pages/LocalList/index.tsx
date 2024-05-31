import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
    BsPlusCircle,
    BsThreeDotsVertical,
    BsPencilSquare,
    BsTrash,
} from "react-icons/bs";
import {
    TableContainer,
    Table,
    TableCaption,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import {ILocal} from "../../commons/interfaces.ts";
import localService from "../../services/LocalService.ts";

export function MapListPage() {
    const [data, setData] = useState<ILocal[]>([]);
    const [apiError, setApiError] = useState("");
    const [showDeleteMessage, setShowDeleteMessage] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        localService.findAll()
            .then((response) => {
                setData(response.data);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao carregar a lista de locais");
            });

        // localService.findAllImages(1)
        //     .then((response) => {
        //         setDataImages(response.data);
        //         setApiError("");
        //     })
        //     .catch(() => {
        //         setApiError("Falha ao carregar a lista de locais");
        //     });
    };

    const onEdit = (path: string) => {
        navigate(path);
    };

    const onRemove = (id: number) => {
        localService.remove(id)
            .then(() => {
                setShowDeleteMessage(true);
                loadData();
                setTimeout(() => {
                    setShowDeleteMessage(false);
                }, 1500);
                setApiError("");
            })
            .catch(() => {
                setApiError("Falha ao remover o local");
            });
    };

    return (
        <>
            <div className="container">
                <h1 className="fs-2 mb-4 text-center">Lista de Locais</h1>
                <div className="text-center">
                    <Link
                        className="btn btn-success btn-icon mb-3"
                        to="/cadastro/locais/new"
                        title="Novo Local"
                        style={{display: "inline-block"}}
                    >
                        <BsPlusCircle style={{display: "inline-block"}}/> Novo Local
                    </Link>
                </div>
                <TableContainer>
                    <Table>
                        <TableCaption>Lista de locais cadastrados</TableCaption>
                        <Thead>
                            <Tr>
                                <Th>#</Th>
                                <Th>Nome</Th>
                                <Th>Endereço</Th>
                                <Th>Número</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {data.map((map: ILocal) => (
                                <Tr
                                    key={map.id}
                                    _hover={{cursor: "pointer", background: "#eee"}}
                                >
                                    <Td>{map.id}</Td>
                                    <Td>{map.name}</Td>
                                    <Td>{map.street}</Td>
                                    <Td>{map.number}</Td>
                                    <Td>
                                        <Menu>
                                            <MenuButton
                                                as={IconButton}
                                                aria-label="Actions"
                                                icon={<BsThreeDotsVertical size={20}/>}
                                                variant="ghost"
                                            />
                                            <MenuList>
                                                <MenuItem
                                                    icon={<BsPencilSquare/>}
                                                    onClick={() => onEdit(`/cadastro/locais/${map.id}`)}
                                                >
                                                    Editar
                                                </MenuItem>
                                                <MenuItem
                                                    icon={<BsTrash/>}
                                                    onClick={() => onRemove(map.id!)}
                                                >
                                                    Remover
                                                </MenuItem>
                                            </MenuList>
                                        </Menu>
                                    </Td>
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
                {apiError && <div className="alert alert-danger">{apiError}</div>}
                {showDeleteMessage && <div className="alert alert-success">Local removido com sucesso!</div>}
            </div>
        </>
    );
}
