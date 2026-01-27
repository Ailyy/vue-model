<template>
  <div class="content-section">
    <div class="section-header">
      <h2>{{ title }}</h2>
      <a href="#" class="more-link" @click.prevent="handleMoreClick">更多 &gt;</a>
    </div>
    <ul class="content-list">
      <li v-for="(item, index) in items" :key="index" @click="handleItemClick(item)">
        <span class="item-date">{{ item.date }}</span>
        <span class="item-title">{{ item.title }}</span>
        <span class="item-tag" v-if="item.tag">{{ item.tag }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'ContentSection',
  props: {
    title: {
      type: String,
      required: true
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleItemClick(item) {
      this.$emit('item-click', item)
    },
    handleMoreClick() {
      this.$emit('more-click')
    }
  }
}
</script>

<style lang="css" scoped>
.content-section {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  height: 288px;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e3f2fd;
}

.section-header h2 {
  margin: 0;
  font-size: 18px;
  color: #1976d2;
  font-weight: 600;
}

.more-link {
  color: #42a5f5;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.more-link:hover {
  color: #1976d2;
}

.content-list {
  list-style: none;
  margin: 0;
  padding: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

.content-list::-webkit-scrollbar {
  display: none;
}

.content-list li {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f5f5f5;
  cursor: pointer;
  transition: all 0.3s;
}

.content-list li:hover {
  background-color: #f5f9ff;
  padding-left: 10px;
  border-radius: 4px;
}

.content-list li:last-child {
  border-bottom: none;
}

.item-date {
  color: #90a4ae;
  font-size: 13px;
  min-width: 100px;
}

.item-title {
  flex: 1;
  color: #424242;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.item-tag {
  background-color: #e3f2fd;
  color: #1976d2;
  padding: 2px 8px;
  border-radius: 10px;
  font-size: 12px;
  margin-left: 10px;
}
</style>
