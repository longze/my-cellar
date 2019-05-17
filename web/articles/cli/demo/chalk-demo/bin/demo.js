#!/usr/bin/env node

const chalk = require('chalk');
const Spinner = require('cli-spinner').Spinner;
const ora = require('ora');

// console.log(`日志${chalk.green('高亮')}输出: log output ${chalk.yellow('hight light')}`);
console.log(`log output ${chalk.yellow('hight light')}`);

const space = 1000;
let time = space;
setTimeout(() => {
    // console.log(chalk.green('✔') + ' 带图标的输出: 成功');
    console.log(chalk.green('✔') + ' output whit icon : success');
}, time += space);

setTimeout(() => {
    // console.log(chalk.red('✘') + ' 带图标的输出: 失败');
    console.log(chalk.red('✘') + ' output with icon : fail');
}, time += space);

setTimeout(() => {
    // console.log(chalk.red('🔥') + ' 带图标的输出: 火');
    console.log(chalk.red('🔥') + ' output with icon : fire');
}, time += space);

// const spinner = new Spinner(chalk.green('%s ') + '使用 spinner 自定义执行中');
const spinner = new Spinner(chalk.green('%s ') + 'use spinner custom');
spinner.setSpinnerString('⠋⠙⠹⠸⠼⠴⠦⠧⠇');

setTimeout(() => {
    spinner.start();
}, time += space);

setTimeout(() => {
    spinner.stop(true);
    console.log(chalk.green('✔') + ' 执行成功');
}, time += space);

const spinnerOra = ora('使用 ora 库表示执行中');
spinnerOra.color = 'yellow';

setTimeout(() => {
    spinnerOra.start();
}, time += space);

setTimeout(() => {
    // 可以动态修改文本
    spinnerOra.text = '可以动态修改文本...';
}, time += space);

setTimeout(() => {
    spinnerOra.succeed('执行成功');
}, time += space);

setTimeout(() => {
    console.log(`
    ${chalk.green('------------------------------')}
          注 意 动 画 只 能 有 一 个 在 动
    ${chalk.green('------------------------------')}
    `);
}, time += space);
