<template>
  <div class="content">
    <NavBar @menu-change="handleMenuChange" />
    <div class="main-container">
      <div class="detail-header">
        <h1 class="detail-title">{{ documentDetail.title }}</h1>
        <div class="detail-meta">
          <span class="detail-date">{{ documentDetail.date }}</span>
          <span class="detail-tag" v-if="documentDetail.tag">{{ documentDetail.tag }}</span>
        </div>
      </div>
      <div class="detail-content" v-html="documentDetail.content">
      </div>
      <div class="detail-footer">
        <button class="back-button" @click="handleBackClick">返回列表</button>
        <button style="margin-left: 2%;" class="back-button" @click="handleBackClick">下载文件</button>
      </div>
    </div>
    <div class="el-login-footer">
        <span>Copyright © 2023-{{new Date().getFullYear()}} 武汉海德博创科技有限公司.</span>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'DocumentDetailView',
  components: {
    NavBar
  },
  data() {
    return {
      documentDetail: {
        title: '',
        date: '',
        tag: '',
        content: ''
      },
      documentList: [
        {
          id: 1,
          date: '2024-01-20',
          title: '公司管理制度汇编（2024版）',
          tag: '制度',
          content: '公司管理制度汇编（2024版）已正式发布，涵盖以下内容：\n\n一、组织管理制度\n二、人力资源管理制度\n三、财务管理制度\n四、行政管理制度\n五、业务管理制度\n六、质量管理制度\n七、安全管理制度\n\n请各部门组织学习，严格执行。'
        },
        {
          id: 2,
          date: '2024-01-18',
          title: '质量管理体系文件',
          content: '质量管理体系文件包括：\n\n1. 质量手册\n2. 程序文件\n3. 作业指导书\n4. 质量记录\n\n所有文件均已更新，请相关部门遵照执行。'
        },
        {
          id: 3,
          date: '2024-01-15',
          title: '安全生产管理制度',
          tag: '安全',
          content: '安全生产管理制度主要内容包括：\n\n一、安全生产责任制\n二、安全教育培训制度\n三、安全检查制度\n四、事故报告和处理制度\n五、应急预案管理制度\n\n各部门必须严格执行，确保安全生产。'
        },
        {
          id: 4,
          date: '2024-01-12',
          title: '员工行为规范手册',
          content: '员工行为规范手册规定了员工在工作中的行为准则，包括：\n\n一、职业道德规范\n二、工作纪律规范\n三、仪容仪表规范\n四、沟通礼仪规范\n五、保密规范\n\n请全体员工认真学习，自觉遵守。'
        },
        {
          id: 5,
          date: '2024-01-10',
          title: '财务管理制度',
          content: '财务管理制度包括：\n\n一、预算管理制度\n二、费用报销制度\n三、资金管理制度\n四、固定资产管理制度\n五、财务报告制度\n\n各部门必须严格遵守财务制度，规范财务管理。'
        },
        {
          id: 6,
          date: '2024-01-08',
          title: '人力资源管理制度',
          content: '人力资源管理制度涵盖：\n\n一、招聘管理制度\n二、培训管理制度\n三、绩效考核制度\n四、薪酬福利制度\n五、员工关系管理制度\n\n请人力资源部认真执行，其他部门积极配合。'
        }
      ]
    }
  },
  mounted() {
    this.getDocumentDetail()
  },
  methods: {
    getDocumentDetail() {
      const id = this.$route.params.id
      const documentItem = this.documentList.find(item => item.id == id)
      if (documentItem) {
        this.documentDetail = documentItem
      } else {
        // 如果找不到对应ID的文档，显示第一条
        if (this.documentList.length > 0) {
          this.documentDetail = this.documentList[0]
        }
      }
    },
    handleMenuChange(menuItem) {
      console.log('菜单切换:', menuItem)
    },
    handleBackClick() {
      this.$router.push('/document')
    }
  }
}
</script>

<style lang="css" scoped>
.content {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #f5f9ff 0%, #e3f2fd 100%);
  overflow: hidden;
}

.main-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 10px;
  flex: 1;
  overflow-y: auto;
}

.detail-header {
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 2px solid #e3f2fd;
}

.detail-title {
  color: #1976d2;
  font-size: 28px;
  font-weight: 600;
  margin: 0 0 15px 0;
}

.detail-meta {
  display: flex;
  align-items: center;
  gap: 15px;
}

.detail-date {
  color: #90a4ae;
  font-size: 14px;
}

.detail-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
}

.detail-content {
  color: #424242;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 40px;
  white-space: pre-wrap;
  background-color: transparent !important;
}

/* 支持富文本对齐方式和透明背景 */
::v-deep .detail-content * {
  text-align: inherit !important;
  box-sizing: border-box !important;
  background-color: transparent !important;
}

.detail-footer {
  margin-top: 40px;
  text-align: center;
}

.back-button {
  background-color: #42a5f5;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s;
}

.back-button:hover {
  background-color: #1976d2;
}

.el-login-footer {
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-family: Arial;
  font-size: 1.2rem;
  letter-spacing: 1px;
}

@media (max-width: 768px) {
  .main-container {
    padding: 15px;
  }

  .detail-title {
    font-size: 24px;
  }

  .detail-content {
    font-size: 14px;
  }
}
</style>