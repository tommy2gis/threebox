
const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.config.common.js');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = merge(common, {
    mode: 'production',

    module: {
        rules: [

        ]
    },
    optimization:{
        minimizer:[
            new TerserPlugin()
        ],
        concatenateModules: true,
        splitChunks:{
            cacheGroups:{
                vendors:{//node_modules里的代码
                    test:/[\\/]node_modules[\\/]/,
                    chunks: "initial",
                    name:'vendors',
                    priority:10,
                    enforce:true //强制生成
                },
            }
        }
    },
    plugins: [
        
        new CopyWebpackPlugin([{
            from: path.resolve(__dirname, './dist'), //定义要拷贝的源目录，必填项
            //to: path.resolve(__dirname, './dist/'), //定义要拷贝到的目标目录，非必填，不填写则拷贝到打包的output输出地址中
        }]),
    ]
})