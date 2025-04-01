import os
import requests
import urllib.parse
from pathlib import Path

# 创建images目录
images_dir = Path("app/images")
if not images_dir.exists():
    images_dir.mkdir(parents=True)

# 需要下载的图片URL列表 - 确保所有图片都被下载
image_urls = [
    {"url": "https://randomuser.me/api/portraits/women/32.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/women/44.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/men/32.jpg", "prefix": "men_"},
    {"url": "https://randomuser.me/api/portraits/men/36.jpg", "prefix": "men_"},
    {"url": "https://randomuser.me/api/portraits/women/42.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/women/28.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/men/42.jpg", "prefix": "men_"},
    {"url": "https://randomuser.me/api/portraits/women/22.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/men/22.jpg", "prefix": "men_"},
    {"url": "https://randomuser.me/api/portraits/women/33.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/women/68.jpg", "prefix": "women_"},
    {"url": "https://randomuser.me/api/portraits/men/68.jpg", "prefix": "men_"}
]

# 先清空images文件夹中的现有图片
for file in images_dir.glob("*.jpg"):
    try:
        os.remove(file)
        print(f"删除旧图片: {file}")
    except Exception as e:
        print(f"删除图片 {file} 失败: {str(e)}")

# 下载网络图片
for item in image_urls:
    url = item["url"]
    prefix = item["prefix"]
    
    # 从URL中提取文件名
    filename = os.path.basename(urllib.parse.urlparse(url).path)
    # 添加前缀
    prefixed_filename = prefix + filename
    output_path = images_dir / prefixed_filename
    
    print(f"下载图片: {url} 到 {output_path}")
    
    try:
        response = requests.get(url)
        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            print(f"成功下载: {prefixed_filename}")
        else:
            print(f"下载失败: {url}, 状态码: {response.status_code}")
    except Exception as e:
        print(f"下载出错: {url}, 错误: {str(e)}")

print("图片下载完成！")

# 创建一个示例的LV包图片
try:
    # 创建一个简单的LV包图片
    lv_bag_path = os.path.join(images_dir, "lv_bag.jpg")
    lv_bag2_path = os.path.join(images_dir, "lv_bag2.jpg")
    
    # 如果能访问任何一个随机用户图片，我们可以复制它作为LV包示例
    if os.path.exists(os.path.join(images_dir, "women_42.jpg")):
        with open(os.path.join(images_dir, "women_42.jpg"), 'rb') as source:
            with open(lv_bag_path, 'wb') as target:
                target.write(source.read())
            print(f"创建示例LV包图片: {lv_bag_path}")
        
        # 同样为lv_bag2创建副本
        with open(os.path.join(images_dir, "women_42.jpg"), 'rb') as source:
            with open(lv_bag2_path, 'wb') as target:
                target.write(source.read())
            print(f"创建示例LV包图片: {lv_bag2_path}")
except Exception as e:
    print(f"创建示例图片失败: {str(e)}")

# 创建一个示例的档案背景图片
try:
    dangan_path = os.path.join(images_dir, "dangan.jpg")
    
    # 使用任何现有图片作为档案背景示例
    if os.path.exists(os.path.join(images_dir, "women_28.jpg")):
        with open(os.path.join(images_dir, "women_28.jpg"), 'rb') as source:
            with open(dangan_path, 'wb') as target:
                target.write(source.read())
            print(f"创建示例档案背景图片: {dangan_path}")
except Exception as e:
    print(f"创建示例档案背景图片失败: {str(e)}")

print("所有图片处理完成！")

# 验证所有图片是否存在
expected_images = [
    "women_32.jpg", "women_44.jpg", "men_32.jpg", "men_36.jpg",
    "women_42.jpg", "women_28.jpg", "men_42.jpg", "women_22.jpg",
    "men_22.jpg", "women_33.jpg", "women_68.jpg", "men_68.jpg",
    "lv_bag.jpg", "lv_bag2.jpg", "dangan.jpg"
]

print("\n检查图片列表:")
missing_images = []
for img in expected_images:
    img_path = os.path.join(images_dir, img)
    if os.path.exists(img_path):
        print(f"✅ {img} 存在")
    else:
        print(f"❌ {img} 不存在")
        missing_images.append(img)

if missing_images:
    print("\n缺少以下图片:")
    for img in missing_images:
        print(f" - {img}")
else:
    print("\n所有图片都已成功下载和创建") 