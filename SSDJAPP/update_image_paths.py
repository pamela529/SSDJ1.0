import os
import re
from pathlib import Path

def update_file(file_path, replacements):
    """更新文件中的图片路径"""
    if not os.path.exists(file_path):
        print(f"文件不存在: {file_path}")
        return
    
    try:
        with open(file_path, 'r', encoding='utf-8') as file:
            content = file.read()
        
        # 执行所有替换
        for old_path, new_path in replacements.items():
            content = content.replace(old_path, new_path)
        
        with open(file_path, 'w', encoding='utf-8') as file:
            file.write(content)
        
        print(f"已更新文件: {file_path}")
    except Exception as e:
        print(f"更新文件 {file_path} 时出错: {str(e)}")

# 获取所有需要处理的文件
html_files = list(Path('app').glob('**/*.html'))
js_files = list(Path('app').glob('**/*.js'))
css_files = list(Path('app').glob('**/*.css'))

all_files = html_files + js_files + css_files

# 定义替换规则
replacements = {
    # 随机用户头像
    'https://randomuser.me/api/portraits/women/32.jpg': 'images/women_32.jpg',
    'https://randomuser.me/api/portraits/women/44.jpg': 'images/women_44.jpg',
    'https://randomuser.me/api/portraits/men/32.jpg': 'images/men_32.jpg',
    'https://randomuser.me/api/portraits/men/36.jpg': 'images/men_36.jpg',
    'https://randomuser.me/api/portraits/women/42.jpg': 'images/women_42.jpg',
    'https://randomuser.me/api/portraits/women/28.jpg': 'images/women_28.jpg',
    'https://randomuser.me/api/portraits/men/42.jpg': 'images/men_42.jpg',
    'https://randomuser.me/api/portraits/women/22.jpg': 'images/women_22.jpg',
    'https://randomuser.me/api/portraits/men/22.jpg': 'images/men_22.jpg',
    'https://randomuser.me/api/portraits/women/33.jpg': 'images/women_33.jpg',
    'https://randomuser.me/api/portraits/women/68.jpg': 'images/women_68.jpg',
    'https://randomuser.me/api/portraits/men/68.jpg': 'images/men_68.jpg',
    
    # LV包和档案图片
    'lv_bag.jpg': 'images/lv_bag.jpg',
    '/app/images/lv_bag2.jpg': 'images/lv_bag2.jpg',
    'images/lv_bag2.jpg': 'images/lv_bag2.jpg',
    'images/dangan.jpg': 'images/dangan.jpg'
}

# 更新所有文件
for file_path in all_files:
    update_file(str(file_path), replacements)

print("所有文件更新完成！")

# 打印提示信息
print("\n微信小程序开发注意事项:")
print("1. 在微信小程序中，图片路径需要使用相对路径，所有图片已保存到images文件夹")
print("2. 在微信小程序中引用图片时，需要注意路径是相对于当前WXML文件的")
print("3. 请使用<image>标签替代<img>标签")
print("4. 请将HTML转换为WXML、CSS转换为WXSS、JavaScript适配微信小程序API")
print("5. 微信小程序不支持某些HTML标签和CSS样式，可能需要进一步调整") 