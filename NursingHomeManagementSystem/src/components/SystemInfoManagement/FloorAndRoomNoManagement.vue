<template>
    <div class="page">
        <el-container>
            <el-header class="header-row">
                <el-row class="header-row">
                    <el-col :span="6" :offset="9">
                        楼层信息管理
                    </el-col>
                    <el-col :span="1" :offset="5">
                        <el-button type="success" plain size="small" @click="newFloorFormVisible = true">新增</el-button>
                        <el-dialog title="新增楼层" :visible.sync="newFloorFormVisible" style="text-align: left">
                            <el-form label-position="top" label-width="120px" :model="newFloorInfo" ref="newFloorInfo">
                                <el-row :gutter="10">
                                    <el-col :span="12">
                                        <el-form-item label="楼层" prop="floor" :rules="[{ required: true, message: '楼层不能为空', trigger: 'change'}]">
                                            <el-input-number v-model="newFloorInfo.floor" :min="1" :max="20"></el-input-number>  楼
                                        </el-form-item>
                                    </el-col>
                                    <el-col :span="12">
                                        <el-form-item label="房间号" prop="roomNumber" :rules="[{ required: true, message: '房间号不能为空', trigger: 'change'}]">
                                            <el-input clearable v-model="newFloorInfo.roomNumber" placeholder="请输入房间号，如101"></el-input>
                                        </el-form-item>
                                    </el-col>
                                </el-row>
                                <el-form-item>
                                    <el-button @click="newFloorFormVisible = false">取 消</el-button>
                                    <el-button type="primary" @click="handleNewFloor('newFloorInfo')">确 定</el-button>
                                </el-form-item>
                            </el-form>
                        </el-dialog>
                    </el-col>
                    <el-col :span="1" :offset="1">
                        <el-button type="danger" plain size="small" @click="deleteBeds">删除</el-button>
                    </el-col>
                </el-row>
                <el-row type="flex" justify="start" :gutter="20">
                    <el-col :span="8">
                        <el-select clearable class="widen" v-model="queryFloor" placeholder="请选择楼层">
                            <el-option v-for="item in getFloorOption()" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="8">
                        <el-select clearable class="widen" v-model="queryRoomNum" placeholder="请选择房间号">
                            <el-option v-for="item in getRoomNumOption(false)" :key="item" :label="item" :value="item">
                            </el-option>
                        </el-select>
                    </el-col>
                    <el-col :span="4">
                        <el-button @click="query">查询</el-button>
                    </el-col>
                </el-row>
            </el-header>
            <el-main>
                <el-table :data="curData.slice((currentPage-1)*pagesize,currentPage*pagesize)" stripe style="width: 100%; text-align: left;" tooltip-effect="dark" @selection-change="handleSelectionChange">
                    <el-table-column type="selection" width="55">
                    </el-table-column>
                    <el-table-column type="index" width="55" label="序号">
                    </el-table-column>
                    <el-table-column prop="floor" label="楼层">
                    </el-table-column>
                    <el-table-column prop="roomNumber" label="房间号">
                    </el-table-column>
                    <el-table-column label="操作">
                        <div slot-scope="scope">
                            <el-button @click="modifiedButtClick(scope.$index)" type="text" size="small">编辑</el-button>
                            <el-dialog title="编辑信息" :visible.sync="modifiedFormVisible">
                                <el-form label-position="top" label-width="120px">
                                    <el-row :gutter="10">
                                        <el-col :span="12">
                                            <el-form-item label="楼层">
                                                <el-input clearable v-model="modifiedInfo.floor" :placeholder="modifiedInfo.floor"></el-input>
                                            </el-form-item>
                                        </el-col>
                                        <el-col :span="12">
                                            <el-form-item label="房间号">
                                                <el-input clearable v-model="modifiedInfo.roomNumber" :placeholder="modifiedInfo.roomNumber"></el-input>
                                            </el-form-item>
                                        </el-col>
                                    </el-row>
                                    <el-form-item>
                                        <el-button @click="modifiedFormVisible = false">取 消</el-button>
                                        <el-button type="primary" @click="handleInfoModified(scope.$index)">确 定</el-button>
                                    </el-form-item>
                                </el-form>
                            </el-dialog>
                            <el-button type="text" size="small" @click="deleteARoom(scope.$index)">删除</el-button>
                        </div>
                    </el-table-column>
                </el-table>
                <el-pagination small layout="prev, pager, next" :total="curData.length" :page-size="pagesize" @current-change="handleCurrentChange" :current-page="currentPage">
                </el-pagination>
            </el-main>
        </el-container>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                newFloorInfo: {
                    roomNumber: '',
                    floor: '',
                },
                newFloorFormVisible: false,
                floorData: [],
                modifiedInfo: {
                    roomNumber: '',
                    floor: '',
                },
                modifiedFormVisible: false,
                queryFloor: '',
                queryRoomNum: '',
                loading: true,
                selection: [],
                curData: [],
                currentClick: -1,
                currentPage: 1,
                pagesize: 20,
            }
        },
        methods: {
            handleNewFloor(formName) {
                let self = this
                this.newFloorInfo.bedNumber = 'FloorInfo'
                this.newFloorInfo.floor += '楼'
                // 检查是否重复
                for(var i in this.floorData) {
                    if(this.newFloorInfo.roomNumber == this.floorData[i].roomNumber && this.newFloorInfo.floor == this.floorData[i].floor) {
                        self.$alert('楼层房间号已存在', '失败', {
                            confirmButtonText: '确定'
                        });
                        self.$refs[formName].resetFields();
                        return
                    }
                }
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        //发送请求
                        $.ajax({
                            url: self.urlHeader + '/bedInfo/create',
                            type: 'post',
                            contentType: 'application/json;charset=UTF-8',
                            data: JSON.stringify(self.newFloorInfo),
                            success: function(data) {
                                //解析返回的data
                                var newBed = data.data
                                self.curData.push(newBed)
                                self.getAllFloorInfo(false)
                                self.newFloorFormVisible = false
                                self.$refs[formName].resetFields();
                                self.$message({
                                    message: '新增楼层房间号成功',
                                    type: 'success'
                                });
                            },
                            error: function(err) {
                                self.$alert('新增楼层房间号失败', '失败', {
                                    confirmButtonText: '确定'
                                });
                                console.log(err)
                            }
                        })
                    } else {
                        self.$alert('新增楼层房间号失败', '失败', {
                            confirmButtonText: '确定'
                        });
                        return false;
                    }
                });
            },
            modifiedButtClick(index) {
                this.modifiedFormVisible = true
                this.modifiedInfo = this.curData[index]
                this.currentClick = index
            },
            handleInfoModified() {
                var index = this.currentClick
                //发送请求
                let self = this
                // 检查是否重复
                for(var i in this.floorData) {
                    if(this.modifiedInfo.roomNumber == this.floorData[i].roomNumber && this.modifiedInfo.floor == this.floorData[i].floor) {
                        self.$alert('楼层房间号已存在', '失败', {
                            confirmButtonText: '确定'
                        });
                        return
                    }
                }
                //发送修改请求
                $.ajax({
                    url: self.urlHeader + '/bedInfo/change',
                    type: 'post',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify(self.modifiedInfo),
                    success: function(data) {
                        //解析返回的data
                        self.curData[index] = self.modifiedInfo
                        self.getAllFloorInfo(false)
                        self.modifiedFormVisible = false
                        self.$message({
                            message: '修改成功',
                            type: 'success'
                        });
                    },
                    error: function() {
                        self.$alert('修改楼层房间号信息失败', '失败', {
                            confirmButtonText: '确定'
                        });
                    },
                })
            },
            //删除单个差错记录
            deleteARoom(index) {
                let self = this
                this.$confirm('此操作将删除该房间号，是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    //发送删除请求
                    $.ajax({
                        url: self.urlHeader + '/bedInfo/delete',
                        type: 'post',
                        contentType: 'application/json;charset=UTF-8',
                        data: JSON.stringify({
                            id: self.curData[index].id
                        }),
                        success: function(data) {
                            //解析返回的data
                            self.curData.splice(index, 1)
                            self.$message({
                                message: '删除房间号成功',
                                type: 'success'
                            });
                        },
                        error: function() {
                            self.$alert('删除房间号失败，请检查网络', '失败', {
                                confirmButtonText: '确定'
                            });
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            handleSelectionChange(val) {
                this.selection = val
            },
            //删除选中床位
            deleteBeds() {
                let self = this
                function deleteR(id) {
                    $.ajax({
                        url: self.urlHeader + '/bedInfo/delete',
                        type: 'post',
                        contentType: 'application/json;charset=UTF-8',
                        data: JSON.stringify({
                            id: id
                        }),
                        success: function(data) {
                            //如果没有删除完
                            if (self.selection.length > 0) {
                                deleteR(self.selection.pop().id)
                            } else {
                                //如果删除完毕
                                self.getAllFloorInfo(true)
                                self.$message({
                                    message: '删除房间号成功',
                                    type: 'success'
                                });
                            }
                        },
                        error: function() {
                            self.$alert('删除房间号失败，请检查网络', '失败', {
                                confirmButtonText: '确定'
                            });
                        }
                    })
                }
                if (self.selection.length > 0) {
                    this.$confirm('此操作将删除这些房间号，是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //递归删除
                        deleteR(self.selection.pop().id)
                    }).catch((error) => {
                        console.log(error)
                        self.$message({
                            type: 'info',
                            message: '删除失败，请重试'
                        });
                    });
                } else {
                    self.$message({
                        type: 'info',
                        message: '请选择房间号进行删除'
                    });
                }
            },
            //获取所有差错记录
            getAllFloorInfo(flag) {
                let self = this
                //获取所有员工信息
                $.ajax({
                    // url: self.urlHeader + '/employee/findAll',
                    url: 'http://101.132.142.238:12222/bedInfo/findAll',
                    type: 'post',
                    contentType: 'application/json;charset=UTF-8',
                    data: JSON.stringify({
                        id: '1'
                    }),
                    success: function(data) {
                        var info = []
                        for (var i in data.data) {
                            if (data.data[i].bedNumber === 'FloorInfo') {
                                info.push(data.data[i])
                            }
                        }
                        //解析返回的data
                        console.log(info)
                        if (flag) {
                            self.curData = info
                        }
                        self.floorData = info
                        self.loading = false
                    },
                    error: function() {
                        self.$confirm('房间号加载失败，请检查网络', '失败', {
                            confirmButtonText: '重新加载',
                            cancelButtonText: '取消',
                            type: 'warning'
                        }).then(() => {
                            self.getAllFloorInfo(flag)
                        }).catch(() => {
                            self.loading = false
                            self.$message({
                                type: 'info',
                                message: '取消加载'
                            });
                        });
                    }
                })
            },
            query() {
                var floorResult = []
                var roomNumResult = []
                var flags = [false, false]
                if (this.queryFloor) {
                    flags[0] = true
                    for (var err in this.floorData) {
                        if (this.floorData[err].floor == this.queryFloor) {
                            floorResult.push(this.floorData[err])
                        }
                    }
                }
                if (this.queryRoomNum) {
                    console.log(this.queryRoomNum)
                    flags[1] = true
                    for (var err in this.floorData) {
                        if (this.floorData[err].roomNumber == this.queryRoomNum) {
                            roomNumResult.push(this.floorData[err])
                        }
                    }
                }
                if (!this.queryFloor && !this.queryRoomNum) {
                    this.curData = this.floorData
                    return
                }
                function intersection(obj1, obj2, index1, index2) {
                    var result = []
                    //obj1有输入
                    if (flags[index1]) {
                        //为空
                        if (obj1.length == 0) {
                            return []
                        } else {
                            //非空，判断obj2
                            //obj2有输入
                            if (flags[index2]) {
                                //为空
                                if (obj2.length == 0) {
                                    return []
                                } else {
                                    //非空
                                    for (var i = 0; i < obj1.length; i++) {
                                        for (var j = 0; j < obj2.length; j++) {
                                            if (obj1[i].id == obj2[j].id) {
                                                result.push(obj1[i])
                                            }
                                        }
                                    }
                                    return result
                                }
                            } else {
                                //obj2无输入
                                return obj1
                            }
                        }
                    } else {
                        //obj1无输入
                        //obj2有输入
                        if (flags[index2]) {
                            //为空
                            if (obj2.length == 0) {
                                return []
                            } else {
                                return obj2
                            }
                        } else {
                            //obj2无输入
                            return []
                        }
                    }
                }
                console.log(floorResult, roomNumResult)
                var result = intersection(floorResult, roomNumResult, 0, 1)
                this.curData = result
            },
            handleCurrentChange(currentPage) {
                this.currentPage = currentPage
            },
            //   获取楼层选项
            getFloorOption() {
                var floorOption = []
                for (var i in this.floorData) {
                    if ($.inArray(this.floorData[i].floor, floorOption) === -1) {
                        floorOption.push(this.floorData[i].floor)
                    }
                }
                return floorOption
            },
            //获取房间号选项
            getRoomNumOption() {
                if (this.queryFloor) {
                    var option = []
                    for (var i in this.floorData) {
                        if (this.floorData[i].floor == this.queryFloor) {
                            option.push(this.floorData[i].roomNumber)
                        }
                    }
                    console.log(option)
                    return option
                } else {
                    return []
                }
            },
        },
        mounted: function() {
            this.getAllFloorInfo(true)
        }
    }
</script>

<style scoped>
    .widen {
        display: inline;
    }
    .header-row {
        margin-bottom: 20px;
        border-bottom: 1px;
    }
</style>