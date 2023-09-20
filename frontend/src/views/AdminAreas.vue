<template>
    <div id="Areas">
      <AdminBack viewName="Áreas" previewsRoute="admin-home" />
      <div class="areas">
        <ul class="list-group" v-for="area in areas" :key="area.id">
          <li class="list-group-item d-flex justify-content-between align-items-center col-10 col-md-6 col-xl-4 m-1">
            {{ area.area }}
            <span
              class="badge bg-danger rounded-pill"
              @click="ToggleConfirm(area)"
              v-if="!area.confirm"
            >
              Excluir área
            </span>
            <span
              class="badge bg-danger rounded-pill"
              @click="Delete(area.id)"
              v-else
            >
              Clique novamente para confirmar
            </span>
          </li>
        </ul>
      </div>
      <div class="create-area">
        <ul class="list-group">
          <li class="list-group-item d-flex justify-content-between align-items-center col-10 col-md-6 col-xl-4 m-1">
            <input type="text" class="form-control" v-model="area">
            <div class="p"></div>
            <span class="badge bg-success rounded-pill" @click="Create()">Cadastrar área</span>
          </li>
        </ul>
      </div>
    </div>
</template>

<script>
import AdminBack from "@/components/AdminBack.vue"
import axios from "axios"

export default {
name: "Areas",
data() {
    return {
    areas: [],
    area: "",
    };
},
methods: {
    Create() {
    const token = localStorage.getItem("token")
    if (token) {
        var req = {
            headers: {
                Authorization: "Bearer " + token
            },
        }
        axios.post("http://localhost:8080/questions/areas/new", {
            area: this.area,
        }, req)
        .then(() => {
            axios.get("http://localhost:8080/questions/areas", req).then((res) => {
            this.areas = res.data.areas.map((area) => ({
                ...area,
                confirm: false, // Adiciona a variável confirm para cada área
            }))
            })
        })
        .catch((error) => {
            console.log(error)
        });
    }
    },
    ToggleConfirm(area) {
    area.confirm = !area.confirm;
    },
    Delete(id) {
    const token = localStorage.getItem("token")
    if (token) {
        var req = {
        headers: {
            Authorization: "Bearer " + token,
        },
        };
        axios.delete(`http://localhost:8080/questions/areas/delete/${id}`, req).then(() => {
        axios.get("http://localhost:8080/questions/areas", req).then((res) => {
            this.areas = res.data.areas.map((area) => ({
            ...area,
            confirm: false, // Define confirm como false após a exclusão
            }))
        })
        })
    }
    },
},
created() {
    const token = localStorage.getItem("token");
    if (token) {
    var req = {
        headers: {
        Authorization: "Bearer " + token,
        },
    };
    axios.get("http://localhost:8080/questions/areas", req).then((res) => {
        this.areas = res.data.areas.map((area) => ({
        ...area,
        confirm: false, // Adiciona a variável confirm para cada área
        }))
    });
    }
},
components: { AdminBack },
};
</script>

<style scoped>
#Areas {
text-align: center;
}
ul > li {
margin: 0.25rem auto !important;
}
ul > li > .p {
padding: 0 15px;
}
.badge {
color: white;
cursor: pointer;
}
</style>
  