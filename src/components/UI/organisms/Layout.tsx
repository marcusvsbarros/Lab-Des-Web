// Importando as bibliotecas necessárias do React e Material-UI
"use client"; // Ativando o modo de renderização no cliente

import * as React from "react"; 
import { styled, useTheme } from "@mui/material/styles"; 
import Box from "@mui/material/Box"; 
import Drawer from "@mui/material/Drawer"; 
import CssBaseline from "@mui/material/CssBaseline"; 
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"; 
import Toolbar from "@mui/material/Toolbar"; 
import List from "@mui/material/List"; 
import Typography from "@mui/material/Typography"; 
import Divider from "@mui/material/Divider"; 
import IconButton from "@mui/material/IconButton"; 
import MenuIcon from "@mui/icons-material/Menu"; 
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"; 
import ChevronRightIcon from "@mui/icons-material/ChevronRight"; 
import InboxIcon from "@mui/icons-material/MoveToInbox"; 
import { useRouter } from "next/navigation"; 
import CustomListItem from "../molecules/CustomListItem"; // Componente personalizado

const drawerWidth = 240; // Largura da gaveta lateral (drawer)

// Componente principal da área de conteúdo, que será deslocada conforme o estado 'open'
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme }) => ({
  flexGrow: 1, // Faz com que o conteúdo ocupe o espaço disponível
  padding: theme.spacing(3), // Espaçamento interno (padding)
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`, // Margem inicial para esconder o conteúdo quando a gaveta está fechada
  variants: [
    {
      props: ({ open }) => open, // Quando a gaveta está aberta
      style: {
        transition: theme.transitions.create("margin", {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0, // Removendo a margem quando a gaveta está aberta
      },
    },
  ],
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

// Componente da barra de navegação superior (AppBar)
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open", // Controla se deve passar a prop open para o AppBar
})<AppBarProps>(({ theme }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open, // Quando a gaveta está aberta
      style: {
        width: `calc(100% - ${drawerWidth}px)`, // Ajusta a largura da barra quando a gaveta está aberta
        marginLeft: `${drawerWidth}px`, // Margem para a esquerda conforme a largura da gaveta
        transition: theme.transitions.create(["margin", "width"], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

// Componente que define o cabeçalho da gaveta
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex", // Alinhamento flexível dos itens
  alignItems: "center", // Alinhamento central
  padding: theme.spacing(0, 1), // Espaçamento
  // necessário para o conteúdo ficar abaixo da barra de navegação
  ...theme.mixins.toolbar, 
  justifyContent: "flex-end", // Alinha o botão para fechar a gaveta à direita
}));

interface LayoutProps {
  children: React.ReactNode; // Define que o componente receberá um 'children' como prop
}

// Componente principal de layout que inclui a gaveta lateral e o conteúdo
const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme(); // Usando o tema do Material-UI
  const [open, setOpen] = React.useState(false); // Estado para controlar se a gaveta está aberta ou fechada

  // Função para abrir a gaveta
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // Função para fechar a gaveta
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const router = useRouter(); // Hook para navegar entre páginas

  return (
    <Box sx={{ display: "flex" }}> {/* Container flexível para layout */}
      <CssBaseline /> {/* Normaliza o estilo padrão do browser */}
      <AppBar position="fixed" open={open}> {/* Barra de navegação superior fixa */}
        <Toolbar> {/* Barra de ferramentas */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[
              {
                mr: 2,
              },
              open && { display: "none" }, // Esconde o ícone do menu quando a gaveta está aberta
            ]}
          >
            <MenuIcon /> {/* Ícone de menu */}
          </IconButton>
          <Typography variant="h6" noWrap component="div"> {/* Título na barra */}
            Fatec Orders
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth, // Largura da gaveta
          flexShrink: 0, // Evita que a gaveta encolha
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box", // Define o modelo de box
          },
        }}
        variant="persistent" // A gaveta permanece aberta até ser fechada
        anchor="left" // A gaveta é ancorada à esquerda
        open={open} // Estado que define se está aberta
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}> {/* Botão para fechar a gaveta */}
            {theme.direction === "ltr" ? ( // Alterna o ícone de acordo com a direção do tema
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider /> {/* Linha divisória */}
        
        <List> {/* Lista de itens de navegação na gaveta */}
          <CustomListItem text="Início" path="/home" icon={<InboxIcon />} />
          <CustomListItem text="Produtos" path="/products" icon={<InboxIcon />} />
          <CustomListItem text="Pedidos" path="/orders" icon={<InboxIcon />} />
          <CustomListItem text="Sair" path="/" icon={<InboxIcon />} />
        </List>
        <Divider /> {/* Outra linha divisória */}
      </Drawer>
      <Main open={open}> {/* Componente principal do conteúdo */}
        <DrawerHeader /> {/* Espaço reservado para a barra de navegação */}
        {children} {/* Renderiza o conteúdo filho */}
      </Main>
    </Box>
  );
};

export default Layout; // Exporta o componente Layout
