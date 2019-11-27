<template>
  <div class="hello">
    <div class="top-container">
      <div class="top-title">
        <h1>多维度网站评估系统</h1>
      </div>
      <div class="top-search" style="margin-top: 30px;">
        <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearchClick"></el-button>
        </el-input>
      </div>
    </div>
    <div class="type-container">
      <el-button type="info"
                 v-for="c in res.classes"
                 @click="handleClassesClick(c)"
                 plain>{{c}}
      </el-button>
    </div>
    <div class="table-container">
      <el-table :data="res.results" style="width: 100%">
        <el-table-column prop="rank" label="排名" width="180"></el-table-column>
        <el-table-column prop="domain" label="域名"></el-table-column>
        <el-table-column prop="website" label="网站名称"></el-table-column>
        <el-table-column prop="details" label="备注">
          <template slot-scope="scope">
            <el-button @click.native.prevent="handleClickShowDetails(scope.$index, res.results)"
                       type="text"
                       size="small">
              详情展示
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size="res.info.numPerPage"
        layout="prev, pager, next, jumper"
        :total="res.info.totalPage">
      </el-pagination>
    </div>


    <el-dialog title="" :visible.sync="detailsVisible" width="80%">

      <div class="dialog-container">
        <div class="dialog-title">
          <h1>多维网站评估系统</h1>
        </div>
        <div class="dialog-search" style="margin-top: 15px;">
          <el-input placeholder="请输入内容" v-model="search" class="input-with-select">
            <el-button slot="append" icon="el-icon-search" @click="handleSearchClick"></el-button>
          </el-input>
        </div>
      </div>

      <div class="title-container">
        <div class="domain">
          <div class="domain-name">{{this.websiteDetail.domain}}</div>
          <div class="domain-name">{{this.websiteDetail.website}}</div>
        </div>
        <div class="rank">排名： {{this.websiteDetail.rank}}</div>
        <div class="type">类别： {{this.websiteDetail.class}}</div>
        <div class="update">
          <el-button v-if="updatingStatus=='updating'" type="primary" size="small" disabled>
            正在更新
          </el-button>
          <el-button v-if="updatingStatus=='latest'" @click.native.prevent="handleUpdateClick" type="primary" size="small">
            更新
          </el-button>
        </div>
      </div>

      <div class="detail-table-container">
        <el-table
          :data="websiteDetailTable"
          stripe
          style="width: 100%">
          <el-table-column
            prop="name"
            label="评估指标">
          </el-table-column>
          <el-table-column
            prop="value"
            label="指标数据">
          </el-table-column>
          <el-table-column
            prop="weight"
            label="动态权重">
          </el-table-column>
        </el-table>
      </div>


      <span slot="footer" class="dialog-footer">
        <el-button @click="handleDialogClose">取 消</el-button>
        <el-button type="primary" @click="handleDialogClose">确 定</el-button>
      </span>

    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
  .dialog-container, .top-container {
    display: flex;
    justify-content: space-between;

    .top-title, .top-search {
      margin: 0 20px;
    }
  }

  .type-container {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    margin: 20px;

    .el-button--info {
      margin: 10px;
    }
  }
  .table-container {
    margin: 30px;
  }

  .detail-table-container {
    margin: 30px;
    height: 200px;
    overflow-y: scroll;
  }

  .title-container {
    display: flex;
    justify-content: space-around;
    align-items: baseline;

    .domain, .rank, .type {
      line-height: 30px;
      margin: 0 30px;
      height: 100%;
    }
  }

  h1, h2 {
    font-weight: normal;
  }
</style>

<script>
  import api from './api.js'
  import 'element-ui/lib/theme-chalk/index.css'

  export default {
    name: 'HelloWorld',
    data() {
      return {
        websiteDetailTable: [],
        websiteDetail: {
          domain: '',
          website: '',
          rank: 0,
          class: '',
        },
        selectedClass: 'all',
        updatingStatus: '',
        currentPage: 1,
        msg: 'Welcome to Your Vue.js App',
        detailsVisible: false,
        search: '',
        type: '类别占位符',
        rank: 1,
        domainName: '百度',
        website: 'www.baidu.com',
        res: {
          info: {
            numPerPage:20,
          }
        }
      }
    },
    mounted() {
      api.getAllInfo(1).then(data => {
        this.res = data
      })
    },
    methods: {
      handleSearchClick() {
        console.log("=========search=======", this.search)
        api.getSearchDetail(this.search).then(data => {
          console.log("================data==============", data)
          if (data.status === false) {

          } else {
            this.$confirm('无该网站信息', {
              confirmButtonText: '即时评估',
              cancelButtonText: '关闭',
              center: true
            }).then(() => {
              this.$message({
                type: 'success',
                message: '已开始评估',
              });
              //TODO:选择即时评估时发送请求给后端，并跳转到网站详情页

              this.detailsVisible = true
              api.evaluateNow(this.search).then(data => {
                this.websiteDetail = data.results
                this.updatingStatus = data.status
                this.websiteDetailTable = []
                data.results.name.forEach((item, index) => {
                  console.log("======table data======", data, index)
                  let obj = {
                    name: data.results.mapping[item],
                    value: data.results.value[index],
                    weight: data.results.weight[index]
                  }
                  this.websiteDetailTable.push(obj)
                })
              })
              this.detailsVisible = true
            })
          }
        })
      },
      handleUpdateClick() {
        console.log("================更新==========")
        api.updateNow(this.websiteDetail.domain).then(data => {
          if (data.status === true) {
            this.$alert('正在更新',{
              confirmButtonText: '确定',
              callback: action => {
                this.websiteDetail = data.results
                this.updatingStatus = "updating"
              }
            });
          } else {
            this.$alert('已是最新结果',{
              confirmButtonText: '确定',
              callback: action => {
                this.websiteDetail = data.results
                this.updatingStatus = "latest"
              }
            });
          }
        })
      },
      handleCurrentChange(page) {
        this.currentPage = page
        if (this.selectedClass === 'all') {
          api.getAllInfo(page).then(data => {
            this.res = data
          })
        } else {
          api.getClassesDetail(c, page).then(data => {
            this.res = data
          })
        }

        console.log(`当前页: ${page}`);
      },
      handleClassesClick(c) {
        console.log(c)
        this.selectedClass = c
        api.getClassesDetail(c, 1).then(data => {
          this.res = data
        })
      },
      handleClickShowDetails(index, data) {
        api.getWebsiteDetail(data[index].domain).then(data => {
          console.log("==================show detail=====", data)
          this.websiteDetail = data.results
          this.updatingStatus = data.status
          this.websiteDetailTable = []
          data.results.name.forEach((item, index) => {
            console.log("======table data======", data, index)
            let obj = {
              name: data.results.mapping[item],
              value: data.results.value[index],
              weight: data.results.weight[index]
            }
            this.websiteDetailTable.push(obj)
          })
        })

        this.detailsVisible = true
      },
      handleDialogClose() {
        this.detailsVisible = false
      }
    }
  }
</script>

