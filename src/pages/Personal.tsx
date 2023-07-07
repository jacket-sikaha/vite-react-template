import { ExpandMore } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Chip,
  Collapse,
  Divider,
  Grid,
  IconButton,
  Paper,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import MaleOutlinedIcon from "@mui/icons-material/MaleOutlined";
import FemaleOutlinedIcon from "@mui/icons-material/FemaleOutlined";
import { red } from "@mui/material/colors";
import { useState } from "react";
import { accountDetail } from "../services/account";
import { useQuery } from "react-query";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
  flexGrow: 1,
  justifyContent: "center",
}));
function Personal() {
  const tabList = ["笔记", "收藏", "点赞"];
  const [selectTab, setSelectTab] = useState([1]);
  const { data, isFetching } = useQuery({
    queryKey: ["personal-detail"],
    queryFn: () =>
      accountDetail(sessionStorage.getItem("sikara-note-userID") || ""),
    // onSuccess(data) {
    //   const temp = new Map();
    // },
  });
  const handleClick = (event: React.SyntheticEvent, index: number): void => {
    setSelectTab(() => {
      const temp = [];
      temp[index] = 1;
      return temp;
    });
  };
  return (
    <Box sx={{ flexGrow: 1, mb: 8, mt: 12 }}>
      <Stack spacing={{ xs: 1, sm: 2, md: 2.5 }} direction="column">
        <Card
          sx={{
            width: {
              xs: 350,
              sm: 400,
              md: 500,
              lg: 600,
            },
            boxShadow: "none",
          }}
        >
          <CardHeader
            sx={{ p: 0 }}
            avatar={
              <Avatar
                sx={{
                  width: 66,
                  height: 66,
                }}
                src={data?.result.avatar}
              />
            }
            title={
              <Typography variant="h6">{data?.result.username}</Typography>
            }
            subheader={
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Typography variant="caption" fontSize={".8rem"} color={"grey"}>
                  {`小红书号：${data?.result.id}`}
                </Typography>
                <Divider orientation="vertical" flexItem sx={{ m: 0.5 }} />
                <Typography variant="caption" fontSize={".8rem"} color={"grey"}>
                  {`IP属地：${data?.result.ip}`}
                </Typography>
              </Box>
            }
          />
        </Card>
        <Typography variant="subtitle2">{data?.result.introduction}</Typography>
        {data?.result.sex === "男" ? (
          <MaleOutlinedIcon color="primary" />
        ) : (
          <FemaleOutlinedIcon color="error" />
        )}
        <Box width={{ xs: 190 }}>
          <Grid container justifyContent={"flex-start"}>
            <Grid item xs={4} textAlign={"center"}>
              {data?.result.follows || 0}
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              {data?.result.fans || 0}
            </Grid>
            <Grid item xs textAlign={"center"}>
              {data?.result.likes || 0}
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                关注
              </Typography>
            </Grid>
            <Grid item xs={4} textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                粉丝
              </Typography>
            </Grid>
            <Grid item xs textAlign={"center"}>
              <Typography variant="caption" color={"grey"}>
                获赞与收藏
              </Typography>
            </Grid>
          </Grid>
        </Box>
        <Grid container rowSpacing={1}>
          <Grid item xs={12}>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              sx={{ width: "50%", margin: "auto" }}
            >
              {tabList.map((str, i) => (
                <Chip
                  key={str}
                  label={str}
                  variant={selectTab[i] ? "filled" : "outlined"}
                  sx={{
                    flexGrow: 1,
                    minWidth: 0,
                    maxWidth: 80,
                    border: "none",
                  }}
                  onClick={(_) => handleClick(_, i)}
                />
              ))}
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Divider variant="middle" />
          </Grid>
          <Grid item xs={12}>
            <Item>2</Item>
          </Grid>
        </Grid>
      </Stack>
    </Box>
  );
}

export default Personal;
