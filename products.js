// Shared product data for index.html and catalog.html.
// To change a product photo: overwrite the file in images/ with the same name, or edit the shape's `img` path below.
// `src` records where each placeholder photo came from; it is not shown on the pages.

const SOURCES = {
  aims: 'AIMS Industrial',
  empire: 'Empire Abrasives',
  mytoolkit: 'MyToolKit UK',
  felder: 'Felder Group',
  busybee: 'Busy Bee Tools',
  einhell: 'Einhell',
  infinity: 'Infinity Tools',
  carbatec: 'Carbatec'
};

// One entry per physical shape. Several catalog models share a shape (and its photo).
const SHAPES = {
  // ---- Rotary burrs (metalworking) ----
  'burr-a': {cat:'Rotary Burrs', code:'A', en:'Cylinder Burr (no end cut)', zh:'圆柱形旋转锉（端面无齿）', img:'images/burr-a-cylinder.jpg',
    look:'直筒形，端面平且无齿。', use:'平面、直角内侧修整，不会伤到底面。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b200-carbide-burr-cylindrical-square-end-double-cut','Sutton B200']},
  'burr-b': {cat:'Rotary Burrs', code:'B', en:'Cylinder Burr with End Cut', zh:'圆柱形旋转锉（端面带齿）', img:'images/burr-b-cylinder-end-cut.jpg',
    look:'直筒形，端面也开了齿。', use:'既能侧铣也能端面切削，用于清根、开槽。',
    src:['aims','https://aimsindustrial.com.au/products/pferd-burr-miniature-shank-cylindrical-end-cut-c3-plus','PFERD ZYAS']},
  'burr-c': {cat:'Rotary Burrs', code:'C', en:'Ball-Nose Cylinder Burr', zh:'圆柱球头形旋转锉', img:'images/burr-c-radius-end.jpg',
    look:'直筒形，头部是半球。', use:'圆角过渡、焊缝修整、曲面与平面衔接处。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b201-carbide-burr-cylindrical-radius-end-double-cut','Sutton B201']},
  'burr-d': {cat:'Rotary Burrs', code:'D', en:'Ball Burr', zh:'球形旋转锉', img:'images/burr-d-ball.jpg',
    look:'整个刃部是一个球。', use:'加工凹面、挖凹坑、内圆弧。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b202-carbide-burr-ball-shape-double-cut','Sutton B202']},
  'burr-e': {cat:'Rotary Burrs', code:'E', en:'Oval Burr', zh:'椭圆形旋转锉', img:'images/burr-e-oval.jpg',
    look:'蛋形，中间粗两头圆。', use:'曲面、圆角及不规则轮廓修整。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b203-carbide-burr-oval-shape-double-cut','Sutton B203']},
  'burr-f': {cat:'Rotary Burrs', code:'F', en:'Tree Radius-End Burr', zh:'圆头树形旋转锉', img:'images/burr-f-tree-radius.jpg',
    look:'从柄端往前逐渐变细，头部是圆的。', use:'圆角、曲面，铸件和叶轮修整常用。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b204-carbide-burr-tree-shape-radius-end-double-cut','Sutton B204']},
  'burr-g': {cat:'Rotary Burrs', code:'G', en:'Pointed Tree Burr', zh:'尖头树形旋转锉', img:'images/burr-g-tree-pointed.jpg',
    look:'从柄端往前逐渐变细，头部是尖的。', use:'尖角、窄缝、锐角处去料。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b205-carbide-burr-tree-shape-pointed-end-double-cut','Sutton B205']},
  'burr-h': {cat:'Rotary Burrs', code:'H', en:'Flame Burr', zh:'火焰形旋转锉', img:'images/burr-h-flame.jpg',
    look:'像火苗：靠柄处收细，中段鼓起，头部收尖。', use:'曲面过渡、窄槽及凹面修整。',
    src:['aims','https://aimsindustrial.com.au/products/sutton-b206-carbide-burr-flame-shape-double-cut','Sutton B206']},
  'burr-j': {cat:'Rotary Burrs', code:'J', en:'60° Cone Burr', zh:'60° 锥形旋转锉', img:'images/burr-j-cone-60.jpg',
    look:'短锥形，锥角 60°（比 90° 尖）。', use:'中心孔、孔口倒角与去毛刺。',
    src:['empire','https://www.empireabrasives.com/60-degree-cone-shape-carbide-burr-double-cut-1-4-shank/','Black Hawk SJ']},
  'burr-k': {cat:'Rotary Burrs', code:'K', en:'90° Cone Burr', zh:'90° 锥形旋转锉', img:'images/burr-k-cone-90.jpg',
    look:'短锥形，锥角 90°（比 60° 钝）。', use:'孔口 90° 倒角、锪孔、去毛刺。',
    src:['aims','https://aimsindustrial.com.au/products/pferd-burr-conical-included-angle-shank-ksk-c3','PFERD KSK']},

  // ---- Woodworking insert knives ----
  'knife-2e-12': {cat:'Insert Knives', code:'2E', en:'2-Edge Insert Knife (12 mm wide)', zh:'双刃可翻转刀片（宽 12 mm）', img:'images/knife-2edge-12mm.jpg',
    look:'长条形薄片，两条长边各有一条 35° 刃口，一边用钝后翻面再用。', use:'装在成型刀头、开槽刀、刨刀头上加工木材。',
    src:['mytoolkit','https://mytoolkit.co.uk/products/30-x-12-x-1-5mm-carbide-insert-knives-pack-of-10','30 × 12 × 1.5 mm']},
  'knife-2e-13': {cat:'Insert Knives', code:'2E', en:'2-Edge Insert Knife (13 mm wide)', zh:'双刃可翻转刀片（宽 13 mm，厚 2.2 mm）', img:'images/knife-2edge-13mm.jpg',
    look:'比 12 mm 系列更长、更厚的长条刀片，两条长边开刃。', use:'较长的刨刀头、平刨/压刨刀轴。',
    src:['mytoolkit','https://mytoolkit.co.uk/products/80-x-13-x-2-2mm-carbide-insert-knives-pack-of-10','80 × 13 × 2.2 mm']},
  'insert-14': {cat:'Insert Knives', code:'SQ', en:'4-Edge Spiral Insert 14 × 14', zh:'螺旋刀轴方形刀粒 14 × 14（四刃）', img:'images/insert-square-14.jpg',
    look:'小方片，中间一个沉头螺钉孔，四条边都是刃。', use:'螺旋刨刀轴；一条边用钝后转 90° 换下一条边。',
    src:['mytoolkit','https://mytoolkit.co.uk/products/12-0-x-12-0-x-1-5mm-carbide-reversible-square-knives-35-angle','同类方形刀粒']},
  'insert-15': {cat:'Insert Knives', code:'SQ', en:'4-Edge Square Insert 15 × 15', zh:'方形刀粒 15 × 15 × 2.5（四刃）', img:'images/insert-square-15.jpg',
    look:'和 14 × 14 相同形式，更大更厚；刃口常磨成微弧（R100/R150）减少接刀痕。', use:'压刨、平刨的螺旋刀轴。',
    src:['busybee','https://www.busybeetools.com/products/carbide-inserts-for-helical-cutterheads','15 × 15 × 2.5 mm']},
  'knife-4e-12': {cat:'Insert Knives', code:'4E', en:'4-Edge Insert Knife (12 mm wide)', zh:'四刃长条刀片（宽 12 mm）', img:'images/knife-2edge-12mm.jpg', refOnly:true,
    look:'外形与双刃长条刀片相近，正反两面都开刃，共 4 条刃。', use:'可用刃口更多，适合批量生产换刀少的场合。',
    src:['mytoolkit','https://mytoolkit.co.uk/products/30-x-12-x-1-5mm-carbide-insert-knives-pack-of-10','参考图：双刃款']},
  'planer-82': {cat:'Insert Knives', code:'PL', en:'Reversible Planer Knife 82 mm', zh:'手提电刨刀片 82 mm（可翻转）', img:'images/planer-blade-82.jpg',
    look:'细长窄条，长 82 mm，两侧都有刃，背面有定位槽。', use:'手提电刨（Makita、Bosch、DeWalt 等 82 mm 刨）。',
    src:['einhell','https://www.einhell.co.uk/p/49568315-2-planerblade-tc-55x82x11/','Einhell 49568315']},

  // ---- Router bits ----
  'rt-straight': {cat:'Router Bits', code:'S', en:'Straight Router Bit', zh:'直刀（直槽刀）', img:'images/router-straight.jpg',
    look:'刃与柄平行，没有轴承。', use:'开直槽、铣边、开榫。',
    src:['carbatec','https://www.carbatec.com.au/products/cmt-straight-router-bit-1-2-shank','CMT 811']},
  'rt-flush': {cat:'Router Bits', code:'T', en:'Flush Trim Router Bit', zh:'修边刀（轴承在刀头底端）', img:'images/router-flush-trim.jpg',
    look:'直刃，轴承在刀头最下端，轴承直径 = 刃径。', use:'沿下方模板或面板把多余部分修齐，常用于贴面修边。',
    src:['carbatec','https://www.carbatec.com.au/products/flush-trim-bit-12-7d-x-12-7l-1-2-shaft-cmt','CMT 806']},
  'rt-pattern': {cat:'Router Bits', code:'P', en:'Pattern Router Bit', zh:'仿形刀（轴承在柄端）', img:'images/router-pattern.jpg',
    look:'直刃，轴承在刃和柄之间（上方）——这是和修边刀最大的区别。', use:'模板放在工件上方时按模板复制形状。',
    src:['carbatec','https://www.carbatec.com.au/products/pattern-bit','CMT 812']},
  'rt-roundover': {cat:'Router Bits', code:'R', en:'Round-Over Router Bit', zh:'圆角刀', img:'images/router-round-over.jpg',
    look:'刃口是向内凹的 1/4 圆弧，底部有轴承。', use:'把工件直角边铣成圆角，R 值即圆角半径。',
    src:['carbatec','https://www.carbatec.com.au/products/arden-round-over-bit-1-2s-31-75d-15-87l-9-52r','Arden 301']},
  'rt-chamfer': {cat:'Router Bits', code:'C', en:'45° Chamfer Router Bit', zh:'45° 倒角刀', img:'images/router-chamfer-45.jpg',
    look:'刃口是倾斜直线（45°），底部有轴承。', use:'在工件边缘铣出 45° 斜边。',
    src:['carbatec','https://www.carbatec.com.au/products/chamfer-bit-45deg-x18mm-1-2-cmt','CMT 836']},
  'rt-vgroove': {cat:'Router Bits', code:'V', en:'90° V-Groove Router Bit', zh:'90° V 形槽刀', img:'images/router-v-groove.jpg',
    look:'刀头呈 V 形尖，没有轴承。', use:'刻字、刻线、开 V 形装饰槽。',
    src:['carbatec','https://www.carbatec.com.au/products/v-groove-bit-38mm','CMT 815']},
  'rt-rabbet': {cat:'Router Bits', code:'RB', en:'Rabbeting Router Bit', zh:'企口刀（裁口刀）', img:'images/router-rabbet.jpg',
    look:'宽而短的直刃，下方有轴承；换不同直径轴承可改变裁口深度。', use:'在板边铣出台阶（裁口/企口），用于背板、拼接。',
    src:['carbatec','https://www.carbatec.com.au/products/12-7x12-7mm-rabbet-cut-1-2s-cmt','CMT 835']}
};

const CATEGORIES = {
  'Rotary Burrs': {zh:'硬质合金旋转锉', field:'金属加工', prefix:'VCRB'},
  'Insert Knives': {zh:'木工硬质合金刀片', field:'木工', prefix:'VCWK'},
  'Router Bits': {zh:'硬质合金木工铣刀', field:'木工', prefix:'VCRT'}
};

// [sku, shape key, spec]
const PRODUCTS = [
  ['VCRB-A0618','burr-a','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-A1020','burr-a','Head 10 × 20 mm · 6 mm shank · OAL 60 mm'],['VCRB-A1225','burr-a','Head 12 × 25 mm · 6 mm shank · OAL 65 mm'],
  ['VCRB-B0618','burr-b','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-B1020','burr-b','Head 10 × 20 mm · 6 mm shank · OAL 60 mm'],
  ['VCRB-C0618','burr-c','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-C1020','burr-c','Head 10 × 20 mm · 6 mm shank · OAL 60 mm'],
  ['VCRB-D0605','burr-d','Head Ø6 mm · 6 mm shank · OAL 50 mm'],['VCRB-D1009','burr-d','Head Ø10 mm · 6 mm shank · OAL 50 mm'],['VCRB-D1209','burr-d','Head Ø12 mm · 6 mm shank · OAL 50 mm'],
  ['VCRB-E0613','burr-e','Head 6 × 13 mm · 6 mm shank · OAL 50 mm'],['VCRB-E1020','burr-e','Head 10 × 20 mm · 6 mm shank · OAL 60 mm'],
  ['VCRB-F0618','burr-f','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-F1020','burr-f','Head 10 × 20 mm · 6 mm shank · OAL 60 mm'],
  ['VCRB-G0618','burr-g','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-G1025','burr-g','Head 10 × 25 mm · 6 mm shank · OAL 65 mm'],
  ['VCRB-H0618','burr-h','Head 6 × 18 mm · 6 mm shank · OAL 50 mm'],['VCRB-H1025','burr-h','Head 10 × 25 mm · 6 mm shank · OAL 65 mm'],
  ['VCRB-J0611','burr-j','Head 6 × 11 mm · 6 mm shank · OAL 50 mm'],['VCRB-K0613','burr-k','Head 6 × 13 mm · 6 mm shank · OAL 50 mm'],

  ['VCWK-201215','knife-2e-12','20 × 12 × 1.5 mm · 35°'],['VCWK-251215','knife-2e-12','25 × 12 × 1.5 mm · 35°'],['VCWK-301215','knife-2e-12','30 × 12 × 1.5 mm · 35°'],['VCWK-351215','knife-2e-12','35 × 12 × 1.5 mm · 35°'],['VCWK-401215','knife-2e-12','40 × 12 × 1.5 mm · 35°'],['VCWK-501215','knife-2e-12','50 × 12 × 1.5 mm · 35°'],['VCWK-601215','knife-2e-12','60 × 12 × 1.5 mm · 35°'],
  ['VCWK-801322','knife-2e-13','80 × 13 × 2.2 mm'],['VCWK-1001322','knife-2e-13','100 × 13 × 2.2 mm'],
  ['VCWK-141402','insert-14','14 × 14 × 2 mm · 37°'],['VCWK-151525','insert-15','15 × 15 × 2.5 mm'],
  ['VCWK-301215-4','knife-4e-12','30 × 12 × 1.5 mm'],['VCWK-401215-4','knife-4e-12','40 × 12 × 1.5 mm'],['VCWK-501215-4','knife-4e-12','50 × 12 × 1.5 mm'],
  ['VCWK-821011','planer-82','82 × 10 × 1.1 mm · double edge'],

  ['VCRT-S0620','rt-straight','Ø6 × 20 mm cut · 6 mm shank'],['VCRT-S0825','rt-straight','Ø8 × 25 mm cut · 8 mm shank'],['VCRT-S1030','rt-straight','Ø10 × 30 mm cut · 12 mm shank'],['VCRT-S1230','rt-straight','Ø12 × 30 mm cut · 12 mm shank'],
  ['VCRT-T0619','rt-flush','Ø6.35 × 19 mm cut · 6.35 mm shank'],['VCRT-T1225','rt-flush','Ø12.7 × 25.4 mm cut · 12.7 mm shank'],
  ['VCRT-P0619','rt-pattern','Ø6.35 × 19 mm cut · 6.35 mm shank'],['VCRT-P1225','rt-pattern','Ø12.7 × 25.4 mm cut · 12.7 mm shank'],
  ['VCRT-R03','rt-roundover','R3.175 mm · 6.35 mm shank'],['VCRT-R06','rt-roundover','R6.35 mm · 6.35 mm shank'],
  ['VCRT-C45-12','rt-chamfer','Ø12.7 mm · 6.35 mm shank'],['VCRT-C45-25','rt-chamfer','Ø25.4 mm · 12.7 mm shank'],
  ['VCRT-V90-12','rt-vgroove','Ø12.7 mm · 6.35 mm shank'],['VCRT-V90-19','rt-vgroove','Ø19 mm · 12.7 mm shank'],
  ['VCRT-RAB12','rt-rabbet','12.7 mm cutting depth · 12.7 mm shank']
].map(([sku,shape,spec])=>({sku,shape,spec,...SHAPES[shape]}));
