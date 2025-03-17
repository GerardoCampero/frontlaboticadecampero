import { Box, HStack, Text, Button } from "@chakra-ui/react";
import TablaLotes from "./tablaLotes";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import html2canvas from "html2canvas"; // Importar html2canvas
import { usePageContext } from "@/components/context/context";

// Usar Intl.NumberFormat para formatear el número con separadores de miles
const formatNumber = (num) => {
    return new Intl.NumberFormat("es-AR").format(num); // Usa el formato en español de Argentina
};

export default function CardCliente({ id }) {
    const [cliente, setCliente] = useState();
    const [selectedDate, setSelectedDate] = useState(null);
    const [lotes, setLotes] = useState([]);
    const [sumaTotal, setSumaTotal] = useState(0);
    const { URL } = usePageContext()

    useEffect(() => {
        const consultaUsuario = async () => {
            const data = await axios.get(`${URL}/consultar_usuarios/${id}`);
            setCliente(data.data);
        };

        const calcularTotal = () => {
            const total = lotes.reduce((acc, item) => acc + item.total, 0);
            setSumaTotal(total);
        };

        if (lotes && lotes.length > 0) {
            calcularTotal();
        }

        consultaUsuario();
    }, [id, lotes]);

    const handleFechaLote = async (date) => {
        setSelectedDate(date);

        // Convertir la fecha seleccionada al formato "dd/MM/yyyy"
        const fechaLote = formatDate(date);
        console.log(URL, 'URL', fechaLote,'FechaLote', id, 'id')

        try {
            const response = await axios.get(`${URL}/buscar_lotes`, {
                params: {
                    fecha: fechaLote,
                    usuario_id: id,
                },
            });

            setLotes(response.data);
        } catch (error) {
            toast.error(error.response?.data?.detail || "Error al obtener los lotes");
            
        }
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const handleExportImage = () => {
        const element = document.getElementById("card-container");
    
        // Ajustar el tamaño dinámico para asegurarse de que todo el contenido esté capturado
        const totalHeight = element.scrollHeight;
        const totalWidth = element.scrollWidth;
    
        // Usar html2canvas para capturar toda la altura y el contenido
        html2canvas(element, {
            scrollX: 0,
            scrollY: 0,
            width: totalWidth,  // C 20aptura todo el contenido horizontal
            height: 1000, // Captura todo el contenido vertical
            x: window.scrollX,
            y: window.scrollY,
            scale: 2, // Aumentar la escala para mayor resolución
            useCORS: true, // Permitir cargar imágenes externas (si las hay)
        }).then((canvas) => {
            // Convertir el lienzo a imagen JPG
            const imgData = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = imgData;
            link.download = `Resumen_${cliente.nombre}_${cliente.apellido}.jpg`;
            link.click();
        });
    };
    
    

    return (
        <Box id="card-container"  h={'100%'} display={'flex'} flexDirection={'column'} alignItems={'center'} >
            <Box p={5}  w={'100%'}>
                <HStack justifyContent="space-around" alignItems="center">
                    <Text fontSize={"lg"}>
                        <Text as="span" fontWeight="bold">
                            Cliente:
                        </Text>{" "}
                        {cliente?.nombre} {cliente?.apellido}
                    </Text>
                    <Box fontSize={"lg"}>
                        <Text as="span" fontWeight="bold">
                            Fecha de compra:
                        </Text>{" "}
                        <DatePicker
                            selected={selectedDate}
                            onChange={(date) => handleFechaLote(date)}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Selecciona una fecha"
                        />
                    </Box>
                        <Text fontSize={"lg"}>
                          <Text as="span" fontWeight="bold">
                            Cantidad de lotes:
                          </Text>{" "}
                          {Array.isArray(lotes) ? lotes.length : 0} 
                        </Text>
                    <Text fontSize={"lg"}>
                        <Text as="span" fontWeight="bold">
                            Precio total:{" "}
                        </Text>
                        {!isNaN(sumaTotal) ? `$${formatNumber(sumaTotal)}` : "$0"}
                    </Text>
                    <Button onClick={handleExportImage} >
                        Exportar como imagen
                    </Button>
                </HStack>
            </Box>
            <Box id="tabla-lotes"   display="flex" justifyContent="center" alignItems="center"  w={'100%'} >
                <TablaLotes lotes={lotes} />
            </Box>



            <ToastContainer />
        </Box>
    );
}
