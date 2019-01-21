export default {
    //tab标签
    tab_home: 'Home',
    tab_cars: 'Vehicle',
    tab_events: 'Event',
    tab_owner: 'Owner',

    //home
    label_distance: 'Today’s Mileage',
    label_duration: 'Today’s Hours',
    label_fuelConsumption: 'Today’s Liters',
    label_cars: 'Today’s Vehicles',
    km: 'km',
    hour: 'h',
    liang: 'unit',
    sheng: 'liter',
    times: 'times',
    pc: 'pc',


    event_for_all: 'Topic',
    event_for_car: 'Vehicle Event',
    event_for_driving: 'Driving Event',
    event_for_work: 'Work Order Event',
    event_for_alarm: 'Gateway Event',
    event_type: 'Event Type',
    event_level: 'Event Level',
    event_desc: 'Event Desc',
    alarm_state: 'Alarm Status',
    search_time: '时间搜索',
    select_time: '时间选择',
    sift_time: '时间筛选',
    start_time: 'Start Time',
    end_time: 'End Time',
    select_start_time: 'Please select start time',
    select_end_time: 'Please select end time',
    start_must_earlier_end: 'Start must be earlier than end time',
    time_interval_less_24: 'Please keep the time interval within 24 hours',

    //title
    event_detail: 'Event Details',
    start_location: 'Start location',
    end_location: 'End location',

    all: 'All',
    search: "Search",
    sift: 'Sift',
    edit: "Edit",
    okText: 'OK',
    cancelText: 'Cancel',
    confirm: 'Confirm',
    cancel: 'Cancel',
    home_upgrade: 'Upgrade',
    reset: 'Repeat',
    failed: "Failed",
    none: "None",
    done: 'Done',
    loading_error: 'Load failed',
    no_data: 'No data',
    scan: 'Scan',
    custom: 'Custom',
    reset_password: 'Reset Password',
    just_time: 'Just',
    minutes_ago: ' minutes ago',
    hours_ago: ' hours ago',
    days_ago: ' days ago',
    months_ago: ' months ago',
    years_ago: ' years ago',

    //登录
    get_code_err: 'Verification code sent error, please try again later',
    code_err: 'Captcha error',
    signIn_again: 'Please login again',
    signIn_timeout: 'Login expired, please login again',
    signIn_err_again: 'Login failed. Please login again',
    signIn_err: 'Login failed. Please login again',
    repeat: 'please try again later',
    change_loginType: 'Switch login mode',
    change_language_IP: 'Switch languages or servers',
    language: 'English',
    select_language: 'Language selection',
    select_serverIP: 'ServerIP selection',
    please_entry_tel: 'Please enter phone number',
    please_entry_username: 'Please enter username',
    tel_format_err: 'The phone number format error!',
    email_format_err: 'The Email format error!',
    please_entry_password: 'Please enter password',
    please_entry_code: 'Please enter captcha',
    get_code: 'Captcha code get failed',
    repeat_later: ' s ',
    signIn: 'SignIn',
    signIn_in: 'SignIn...',
    get_code_limit: 'Request out of rate limit, please try again later!',
    no_authority: '无权限，请联系管理员',
    new_pwd_email: '新密码已发送到邮箱，请注意查收！',
    forget_label: '请输入您注册时使用的Email地址，我们将给您发送重置密码邮件',
    reset_pwd_failed: 'Password reset failed',


    car_detail: 'Vehicle Details',
    add_car: 'Add Vehicle',
    please_entry_plateNo: 'Please enter license number',
    pleaseholder_plateNo: 'Please enter license number',
    please_entry_sn: 'Please enter gateway serial number',
    plateNo: 'License Number',
    please_entry: 'Please enter',
    asset_no: 'Asset Number',
    gateway_no: 'Gateway Serial Number',
    gateway_type: 'Gateway Mode',
    account: 'Username',
    submit: 'Submit',
    register_successful: 'Registered successfully',
    register_failed: 'Registration failed',
    register_car_exist: 'The Vehicle already exists',
    home_nodata_label: 'No data',
    home_refresh_label: 'Please try to refresh!',

    event_confirm: 'Confirmed',
    event_unconfirm: 'Unconfirmed',
    level1: '提示',
    level2: '预警',
    level3: '故障',
    level4: '警告',
    level5: 'Downtime',
    confirm_event: '确认事件',
    successful: '成功',
    before_minutes: '分钟前',
    distance: '行驶里程',
    duration: '行驶时间',


    car_list: '列表',
    car_map: '地图',
    setting: '常规设置',
    userInfo: '个人信息',
    notification: '消息通知',
    about: 'About',
    about_us: 'About us',
    version_info: '版本信息',
    help_and_feek: '帮助与反馈',
    loginOut: '退出登录',
    current_version: '当前版本',
    new_version: '最新版本',
    upgrade_version: '更新版本',
    check_version: '检查版本',
    check_versioning: '检查中...',
    new_version_message: '是否立即升级',
    new_version_title: '发现新版本',
    logo_title: '打造智能车辆管理系统',

    worktime_duraction: '工作时长及行驶里程',
    fuel_distance: '油耗及里程趋势',
    speed: '速度',
    pilot_unbelt: '主驾驶未系安全带',
    co_pilot_unbelt: '副驾驶未系安全带',
    tco_abnormal: '当前冷却液温度:{value}℃',
    insufficient_fuel: '当前油量{value}%',

    event_unflod: '点击展开',
    event_hide: '点击收缩',
    event_engine_start: '启动',
    event_engine_stop: '停止',
    event_engine_load: '发动机负荷',//float [0,100],0:停止  >0:启动  %
    event_rpm: '发动机转速',//float  [0,16383.75]  RPM
    event_speed: '行驶速度',//int  [0,255]  km/h
    event_brake_switch: '制动开关状态',//boolean  0:brake pedal released1:brake pedal depressed
    event_parking_switch: '驻车制动开关状态',//boolean  0:parking brake not set1:parking brake set
    event_steering_wheel_angle: '方向盘转动角度',//float  [-31.374,31.374]  
    event_fuel_level: '油位输入',//float  [0,100]  %
    event_dtcs: '故障码数量',//int [0,127]
    event_mil: 'MIL状态',//boolean  0:off  1:on
    event_coolant_temp: '发动机冷却液温度',//int [-40,215]  ℃
    event_battery_volt: '控制模块电压',//float  [0,65.535]  V
    event_engine_oil_temp: '发动机燃油温度',//int  [-40,215]  ℃
    event_engine_start_time: '发动机启动的时间',//int  [0,65535]  sec
    event_ambient_air_temp: '环境空气温度',//int  [-40,215]  ℃
    event_fuel_pressure: '燃油压力',//int  [0,765]  kPa
    event_throttle_pos: '节气门绝对位置',//float  [0,100]  %
    event_vin: '车辆识别码',//string  17bytes
    event_mil_activated_dist: '自MIL激活后的行驶距离',//int  [0,65535]  km
    event_dtc_cleared_dist: '自故障码被清除以后的行驶距离',//int  [0,65535]  km
    event_mil_activated_time: '自MIL激活后发动机运行时间',//int  [0,65535]  min
    event_dtc_cleared_time: '自故障码被清除以后的运行时间',//int  [0,65535]  min



    common: {
        name: 'Name',
        all: 'All',
        home: 'Home',
        function_navigation: 'Navigation',
        welcome: 'Welcome, { username }!',
        product_name: 'SmartFleet',
        configuration: 'Configuration',
        settings: 'Settings',
        dashboard: 'Dashboard',
        history: 'History',
        plan: 'Plan',
        reset: 'Reset',
        reports: 'Report',
        management: 'Management',
        query: 'Search',
        help: 'Help',
        privacy: 'Privacy',
        terms: 'Terms',
        pagination_footer: '{total} records in total {current} / {pages}',
        table_footer: 'A total of {total} records',
        operation: 'Operation',
        notice: 'Reminder',
        cancel: 'Cancel',
        delete: 'Delete',
        failed: 'Failure',
        finished: 'Complete',
        export: 'Export',
        import: 'Import',
        online: 'Online',
        offline: 'Offline',
        selected: 'Selected',
        item: 'Item',
        clear: 'Clear',
        model: 'Model',
        when: 'Time',
        date: 'Date',
        edit: 'Edit',
        create_time: 'Created on',
        operate: 'Operation',
        file_upload_success: 'File ({fileName}) upload succeeded',
        file_upload_failed: 'File ({fileName}) upload failed',
        get_file_content_failed: 'File parsing failed, please check the file contents.',
        no: 'No',
        yes: 'Yes',
        confirm_delete: 'Confirm delete?',
        confirm_cancle: 'Confirm cancel?',
        chart: {
            online: {
                status: {
                    online: 'Online',
                    offline: 'Offline',
                    exception: 'Abnormal',
                },
            },
            times: 'times',
        },
        time: 'hour',
        day: 'day',
        days: 'day',
        week: 'Week',
        month: 'Month',
        season: 'Quarter',
        year: 'Year',
        this_day: 'Today',
        this_week: 'This Week',
        this_month: 'This Month',
        this_season: 'This Quarter',
        this_year: 'Whole Year',
        kilometre: 'km',
        km_per_hr: 'km/h',
        hour: 'hrs',
        liter: 'liter',
        times: 'times',
        r_per_min: 'r/min',
        unit: 'unit',
        more: 'More',
        email: 'Email',
        enter_email: 'Please enter email',
        enter_correct_email: ' Please enter correct email',
        phone: 'Phone',
        org_name: 'Organization Name',
        type: 'Type',
        detail: 'Details',
        alarms: 'Alarms',
        category: 'Category',
        add: 'Add',
        content: 'Content',
        locale: 'Location',
        duration: 'Duration',

    },
    login: {
        product_desc: 'Management Cloud',
        copyright: 'Copyright',
        copyright_desc: '2018 InHand Networks',
        account_login: 'Username',
        phone_login: 'Phone',
        login_error: 'Username or password error',
        captcha_error: 'Captcha error',
        captcha_send_error: 'Verification code sent error, please try again later',
        auto_login: 'Auto login',
        forget_password: 'Forgot Password',
        login: 'Login',
        regist_account: 'Register Account',
        regist: 'Register',
        password: 'Password',
        enter_password: 'Enter password',
        captcha: 'Verification Code',
        enter_captcha: 'Please enter verification code',
        enter_org_name: 'Please enter organization code!',
        password_desc: 'Enter at least 6 characters, Please use strong password.',
        password_desc2: 'Enter at least 6 characters, case sensitive.',
        comfirm_password: 'Confirm password',
        please_comfirm_password: 'Please confirm password!',
        use_account: 'Use existing account to log in',
    },
    dashboard: {
        online_device: 'Online Device ',
        current_number_online_devices: 'Current Online Device',
        device_total: 'Device Total',
        model: 'Model',
        model_statistic: 'Model Type Statistics',
        analys_event: 'Event Analysis',
        online_rate: 'Online Rate',
        flow: 'Data',
        this_month: 'This Month',
        last_month: 'Last Month',
        device_flow_rank: 'Device Data Rank ',
        device_login_times_rank: ' Device Login Times Rank ',
        upstream: 'Upstream',
        downstream: 'Downstream',
        temporarily_no_data: 'No Data',
        last_30_days_delete: 'Deleted in last 30 days',
        last_30_days_add: 'Added in last 30 days',
        device_number: '{number}units',
        day_distance: 'Today’s Mileage',
        day_worktime: 'Today’s Hours',
        day_consume_fuel: 'Today’s Liters',
        day_clock_vehicle: 'Today’s Vehicles',
        day_illegal_drive: 'Violations',
        illegal_drive_behavior: 'Driving Violations',
        after_distance_m: 'Estimated Maintenance after{ kilometer }',
        after_work_time_m: 'Estimated Maintenance after { time }',
        online: 'Online Status',
        mybe_accident: 'Potential Accidents',
        attendence_rate: 'Attendance Rate ',
        attendence_car: 'Vehicles',
        worktime_trance: 'Working Hours Trend',
        worktime_rank: 'Working Hours Rank',
        worktime: 'Working Hours ',
        travlled_distance: 'Mileage',
        travlldistance_trance: 'Mileage Trend',
        travlldistance_rank: 'Mileage Rank',
        drive_behavior_event: 'Driver Behavior Event',
        vehicle_event: 'Vehicle Event',
        work_list_event: 'Work Order Event',
        gateway_event: 'Gateway Event',
        accident_analyze: 'Accident Analysis',
        fuel_consume: {
            normal: 'Fuel consumption normal',
        },
    },
    routes: {
        position: 'Position:',
        attendance: 'Attendance',
        attendance_num: 'Attendance number',
        condition: 'Condition:',
        drive_behavior: 'Drive behavior',
        current_available_car: 'Available car',
        vehicle_scattergram: 'Position distribution',
        search: 'Please enter',
        day_alarm: "Today's alarm",
    },
    historyTack: {
        state: 'Status',
        history_tack: 'History Track',
        vehicle_state: 'Vehicle Status',
        mileage: 'Mileage',
    },
    fleet: {
        location: 'Location',
        track: 'Track',
        vehicle: 'Vehicle',
        group: 'Group',
        model_manage: 'Model Management',
        model: 'Model',
        driver: 'Driver',
        driverNew: 'Driver(new)',
        vehicle_list: 'Vehicle List',
        vehicle_list_new: 'Vehicle List(new)',
        district: 'Region',
        path: 'Route',
        parameterSetting: 'Parameter Settings',
        gateway: 'Gateway',
        gateway_dashboard: 'Gateway Overview',
        task: 'Task Management',
        gatewaylist: 'Gateway List',
        firmware_management: 'Firmware Management',
        configuration_management: 'Configuration Management',
        event: 'Event',
        vehicleReport: 'Vehicle Report',
        operatingReport: 'Operation Report',
        detailsReport: 'Details Report',
        expenseReport: 'Expense Report',
        logs: 'Log',
        vehicle_overview: 'Vehicle Overview',
    },
    vehicle: {
        stop_vehicle: 'Disable?',
        stop_reason: 'Reason for Disable',
        reach_date: 'Approaching End-of-Life',
        accident: 'Scrapping due to accident',
        asset_transfer: 'Assets Transfer',
        please_input_scrap_reason: 'Please select scrapping reason',
        please_input_scrap_comment: 'Please enter notes',
        scrap: 'Scrapping ',
        other: 'Others',
        carName: 'License Number',
        asset_no: 'Asset Number',
        vehicle_age: 'Vehicle Age',
        mileage: 'Mileage ',
        stop_using: 'Disabled',
        real_time_state: 'Real-time Status',
        basic_info: 'Basic Info',
        last_state: 'Latest Status(5 min earlier)',
        current_state: 'Current Status',
        driving: 'Driving',
        odometer: 'Odometer ',
        voltage: 'Battery Voltage',
        car_condition: 'Vehicle Condition',
        normally: 'Normal',
        brake_state: 'Brake Status',
        on: 'On',
        off: 'Off',
        fuel_residue: 'Fuel Left',
        brake_fluid_level: 'Brake Fluid Level ',
        weather: 'Weather',
        clear: 'Sunny',
        current_speed: 'Current Speed',
        engine_RPM: 'Engine RPM',

    },
    management: {
        site: 'Site',
        gateway: 'Gateway',
        online: 'Online',
        offline: 'Offline',
        remote: 'Remote',
        remote_control: 'Remote Control',
        maintain: 'Maintenance',
        account: 'User',
        organization: 'Organization',
    },
    detail: {
        predict_next_maintain: 'Estimated Maintenance Time',
        work_time_total: 'Total Working Time',
        fuel_consume: 'Fuel Consumption',
        total_maintain_times: 'Total Maintenance Times',
        maintain_times: 'Maintenance Times ',
        total_illegal_behaviorl: 'Total Violations',
        this_30_distance_fuel: 'Mileage and consumption in past 30 days',
        this_30_worktime_distance: 'Working Hours and Mileage and in past 30 days',
        distance: 'Distance',
        fuel_expend: 'Fuel Consumption ',
        work_house: 'Working Hours ',
        speed: 'Speed',
        voltage: 'Battery Voltage',
        temperature: 'Temperature',
        environment_temperature: 'Environment Temp',
        engine_temperature: 'Engine Temp',
        braking_sign: 'Braking Sign',
        history_track: 'History Track',
        history_data: 'History Data',
        work_state: 'Working Status',
        drive_behavior: 'Driving Behavior',
        gateway: 'Gateway',
        routes: 'Vehicle Route',
    },
    task: {
        state: 'Status',
        executing: 'Executing',
        wait_execute: 'Wait',
        exec_failure: 'Failed',
        completed: 'Completed',
        all_type: 'All Types',
        please_input_gateway_name: 'Please input gateway name ',
        task_type: 'Task Type',
        creator: 'Created by',
        start_time: 'Start Time',
        re_execute: 'Re-execute',
        re_execute_task: ' Re-execute task!',
        whether_cancel_these_task: 'Cancel these tasks? ',
        confirm_re_execute: 'Confirm re-execution? ',
        run_config_apply: 'Apply operation configurations',
        interactive_command: 'Interactive commands',
        ovdp_config: 'OVDP Configuration',
        get_running_config: 'Get operation configurations',
        import_upgrade_file: 'Import upgrade files',
        vpn_temporary_channel_config: 'Temporary VPN Tunnel',
        vpn_link_order: 'VPN connection command',
        periodic_cleaning_access_token: 'Periodically clear access_token',
        flow_timing_statistics: 'Periodic Statistics on Data Usage',
        Idle_task_timing_notice: 'Periodic Notifications of Idle Tasks',
        remote_web_management: 'Remote Web Management',
        not_sync: 'Not Sync',
        getting_config: 'Getting configurations',
        applying_config: 'Applying configurations',
        sync_succeed: 'Sync succeeded',
        sync_fail: 'Sync failed ',
    },
    config: {
        config_list: 'Config List',
        please_input_template_name: 'Please enter template name',
        create_template: 'Create Template',
        template_name: 'Template Name',
        description: 'Description',
        progress: 'Progress',
        batch_config: 'Batch Config',
        select_config_device: 'Select a device to configure',
        confirm_delete_template: 'Delete this template?',
        add_config_template: 'Create Config Template',
        import_config_file: 'Import Config Files',
        model: 'Models compatible with the device',
        version_desc: 'Version Description',
        refresh: 'Refresh',
        selected_device: 'Selected device',
        no_device: 'No device added',
        remote_config: 'Remote Config',
        check_detail: 'View Details',
        detail: 'Details',
        configure_content: 'Config Contents',
        all_model: 'All Models',
    },
    gateway: {
        gateway_name: 'Gateway Name',
        gateway_list: 'Gateway List',
        create_gateway: 'Create Gateway',
        please_select: 'Please select',
        serial_number: 'Serial Number',
        signal: 'Signal',
        version_now: 'Current Version',
        remove: 'Remove',
        web_management: 'Web Management',
        check_log: 'View Log',
        confirm_delete_devices: 'Delete these devcies?',
        confirm_delete_device: 'Delete device?',
        confirm_remove_device: 'Delete this device? ',
        confirm_kick_devices: 'Force the device to get offline?',
        device_relaunched_after_offline: 'The device will be get online again after offline',
        more_operations: 'More Operations',
        add_gateway: 'Add Gateway',
        online_time: 'Online Time',
        offline_time: 'Offline Time',
        never_online: 'Never Online',
        edit: 'Edit',
        remote_control: 'Remote Control',
        forced_offline: 'Force offline',
        reboot: 'Reboot',
        firmware_version: 'Firmware Version',
        detail_info: 'Details',
        phone_number: 'Phone Number',
        address: 'Address',
        config_sync_state: 'Configure Sync Status',
        login_protocol: 'Login Protocol',
        traffic_statistics: 'Data Usage Statistics',
        online_statistics: 'Online Statistics',
        batch_import: 'Batch Import',
        batch_import_gateway_device: 'Gateway Import in Batch',
        import_sn_file: 'Import Serial Number File',
        serial_number_template_file: 'Serial Number File Template',
        vendor_name: 'Vendor',
        get_config: 'Get Configurations',
        import_config_file: 'Export Config Files',
        apply_config: 'Apply',
        applying_config: 'Applying configurations',
        apply_config_to_more_device: 'Apply to more devices',
        dragger_text: 'Click or drag file to here to upload',
        select_file: 'Select file',
        download_template_file: ' Serial Number File Template Download',
        gateway_serial_number: 'Gateway Serial Number',
    },
    report: {
        lastLocation: 'Last Position',
        lastTime: ' Last Time',
        odometerKm: 'Odometer Reading (km)',
        mileageKm: 'Mileage (km)',
        dayFuelConsumptionL: 'Avg. Daily Fuel Consumption (L)',
        HKmFueConsumptionL: '100km Fuel Consumption (L)',
        fuelConsumptionL: 'Fuel Consumption (L)',
        remainingOilL: 'Remaining Fuel (L)',
        workingHours: 'Working Hours (hours)',
        attendanceDays: 'Attendance Days',
        alarmNumber: 'No. of Alarms',
        initialPosition: 'Initial Position',
        initialTime: 'Initial Time',
        averageFuelL: 'Avg. Fuel Consumption (L)',
        fuelQuantityL: 'Refueling Amount (L)',
        alarmTimes: 'Times of Alarms',
        lastAlarm: 'Last Alarm',
    },
    system: {
        // System
        system: 'System',
        net_state: 'Network Status',
        task_state: 'Task Status',
        log: 'Operation Log',
        history_export_plan: 'Export Plan',
        loop: 'Execution Frequency',
        unit: 'Unit',
        vars: 'Variable',
        last_execute_time: 'Last Execution Time',
        days: 'Day',
        hours: 'Hour',
        minutes: 'Mins',
        seconds: 'Second',
        day: 'Day',
        hour: 'Hour',
        minute: 'Minute',
        second: 'Second',
        delete_plan: 'Delete plan?',
        delete_plan_describe: 'Please confirm deleting these plans',
        create_schedule_plan: 'Create Plan',
        update_schedule_plan: 'Modify Plan',
        plan_information: 'Plan Information',
        config_vars: 'Configure Variables',
        config_ftp: 'Configure FTP',
        exportplan_time_limit: '10 minutes ~ 7 days',
        group: 'Group',
        has_no_grouping: 'Ungrouped',
        varible_type: 'Variable Type',
        instantaneous: 'Instant',
        statistics: 'Statistics',
        variables_select: 'Select variable',
        detailed_monthly_report: 'Monthly Data Report',
        currentmonth: 'This Month',
        data: 'Data',
        daily_tx: 'Daily Sending',
        daily_rx: 'Daily Receiving',
        daily_total: 'Daily Summary',
        input_device_name: 'Please enter device name',
        device: 'Device',
        start_time: 'Start Time',
        reexecute: 'Re-execute',
        confirm_reexecute: 'Confirm re-execution',
        reexecute_tasks: 'Re-execute task! ',
        cancel_tasks: 'Cancel these tasks?',
        run_config_apply: 'Apply operation configurations',
        interactive_command: 'Interactive Command',
        get_running_config: 'Get operation configurations ',
        import_upgrade_file: 'Import Upgrade File',
        vpn_temporary_channel_config: 'Temporary VPN Tunnel ',
        vpn_link_order: 'VPN Connection Command',
        periodic_cleaning_access_token: 'Periodically clear access_token',
        regular_statistics_of_traffic: 'Periodic Statistics on Data Usage',
        idle_task_timing_notice: 'Periodic Notifications of Idle Tasks',
        remote_web_management: 'Remote Web Management',
        exexuting: 'Exexuting ',
        waiting: 'Waiting',
    },
    upgrade: {
        firmware_list: 'Firmware List',
        please_input_firmware_name: 'Please enter firmware name',
        create_firmware: 'Add Firmware',
        firmware_name: 'Firmware Name',
        firmware_version: 'Firmware Version Number',
        add_firmware: 'Add Firmware',
        upload_firmware: 'Upload Firmware',
        select_firmware: 'Select Firmware',
        confirm_delete_firmware: 'Delete this template?',
        batch_upgrade: 'Batch Upgrade',
        remote_upgrade: 'Remote Upgrade',
        select_device: 'Select device',
    },
    org: {
        creator: 'Created by',
        select_a_option: 'Select an item',
    },
    map: {
        maps: 'Map',
        name: 'Name',
        shown_all_map: 'Show Entire Map',
        shown_focus_area: 'Show Focus Area',
        speed: 'Speed',
        current_job: 'Current Task',
        position: 'Position',
        select_area: 'Select area',
        add_area: 'Add area',
        add_route: 'Add route',
        add_interest_point: 'Add interest point',
        select_area_query: 'Query vehicle in selected area',
        display_area_vehicles: 'Show vehicles in selected area',
        measure_distance: 'Measure Distance',
        measure_area: 'Measure Area',
        way_of_live: 'Route Live',
        layer_display: 'Layer Display',
        layer_hide: 'Layer Hide',
        center: 'Center Point',
        longitude: 'Longitude',
        latitude: ' Latitude',
        acreage: 'Area',
        address: 'Address',
        help: {
            tip: 'Please enter keyword:',
        },
    },
    notice: {
        // Notice
        notice: 'Notice',
        alarms: 'Alarm',
        logs: 'Log',
        level: 'Level',
        serious_warning: 'Severe Warning',
        important_warning: 'Important Warning',
        minor_warning: 'Minor Warning',
        downtime: 'Downtime',
        caution: 'Warning',
        remind: 'Reminder',
        alarm_state: 'Alarm Status',
        alarm_occur: 'Unclear',
        alarm_remove: 'Cleared',
        sure_state: 'Confirm Status',
        unconfirmed: 'Unconfirmed ',
        confirmed: 'Confirmed',
        sites: 'Site',
        carName: 'License Number',
        type: 'Type',
        event_type: 'Event Type',
        alarm_time: 'Alarm Time',
        clear_time: 'Clear Time',
        description: 'Description ',
        confirm_account: 'Confirm Account',
        alarm_processing: 'Alarm Processing',
        confirmalarm: 'Confirm alarm? ',
        alarm_detail: 'Alarm Details',
        site_name: 'Site Name',
        alarm_origin: 'Alarm Source',
        confirm_time: 'Confirm Time',
        state: 'Status',
        comment: 'Notes',
        enter_site: 'Please enter site',
        enter_type: 'Please enter type',
        early_warning: 'Pre-alarm',
        notice_way: 'Notification Method',
        asset_monitoring_online: 'Asset Monitoring Online',
        asset_monitoring_offline: 'Asset Monitoring Offline',
        overspeed: 'Overspeed',
        mph: 'Speed {value} km/h',
        car_notice: 'Vehicle Event',
        driving_notice: 'Driving Event',
        vehicle_start: 'Vehicle Start',
        vehicle_stop: 'Vehicle Stop',
        backroute: 'Back To Route',
        outroute: 'Out of Route',
        backzone: 'Back To Zone',
        outzone: 'Out of Zone',
        angle: 'Turn {value} Degrees',
        fatigure: 'Fatigue Driving, Has Been Driving For {value} Hours',
        belt: 'Unfastened Seat Belt',
        brake: 'Emergency Braking, Speed Before Braking {value} km/h',
        driver_change: 'Driver Information Change',
        fuel_change: 'Oil Quantity Change: {value} Liter',
        gnss_fault: 'Antenna Failure',
        gnss_short: 'Antenna Short',
        gnss_cut: 'The Antenna Is Cut',
        battery_power_off: 'Power Failure',
        battery_undervoltage: 'Power Supply Undervoltage',
        crash: 'Collision Warning, Collision Speed {value} km/h',
        turnover: 'Rollover Warning, Rollover Angle {value}',
        urgency: 'Emergency Alarm Pressed, Duration {value} Seconds',
    },
    event: {
        behavior: {
            fatigure: 'Fatigue Driving',
            belt: 'Safety Belt',
            overspeed: 'Speeding',
            brake: 'Emergency Brake',
            abnormal_braking: 'Abnormal Braking',
            belt_true: 'Fasten the safety belt ',
            belt_false: 'Safety belt not fastened ',
            type_accident_maybe: 'Suspected Accident',
            type_accident: 'Accident',
            type_behavior: 'Driver Behavior',
        },
        vehicle: {
            type: {
                engine: 'Engine',
                zone: 'Region',
                overspeed: 'Speeding',
                angle: 'Turn',
            },
            grade: {
                type_alarm: 'Alarm',
                type_notify: 'Notice',
                type_others: 'Others',
            },
        },
    },
    message: {
        modify_success: 'Modification succeeded',
        bind_success: 'Binding succeeded',
        unbound: 'Unbind',
        add_success: 'Add succeeded',
        delete_success: 'Delete succeeded',
        remove_success: 'Remove succeeded',
        upgrade_task_create_success: 'Creating upgrade task succeeded',
        config_task_create_success: 'Creating config task succeeded',
        reset_pwd_success: 'Password has been reset',
        lock_success: 'Lock succeeded',
        unlocked_success: 'Unlock succeeded',
        import_success: 'Import succeeded',
        operate_success: 'Operation succeeded',
        get_config_failed: 'Getting config failed',
        get_config_success: 'Getting config succeeded',
        apply_config_task_success: ' Applying config, task has been created',
        save_config_success: 'Configuration saved',
    },
    topology: {
        rs232_device: 'RS232 device',
        rs485_device: 'RS485 device',
        tcp_ip_device: 'TCP/IP device',
        device_total: 'Total Devices',
        io_variable: 'IO Variable',
        imitation_variable: 'Analog Variable',
        model: 'Model',
        controller: 'Controller',
    },
    result: {
        request_error: 'Request Error',
        download_failed_please_download_again: 'Download failed, Please download again. ',
        please_input_gateway_name: 'Please enter gateway name!',
        gateway_name_already_exist: 'Gateway name already exists!',
        unselected_firmware: 'No firmware selected!',
        please_select_file: 'Please select file!',
        please_input_template_name: 'Please enter template name',
        200: 'The server successfully returned the requested data',
        201: 'Adding data or modifying data succeeded.',
        202: 'A request has entered the background queue (asynchronous task) ',
        204: 'Delete data successfully.',
        400: 'The sent request has error, and the server did not perform any operations to create or modify data. ',
        401: 'The user does not have access (token, username, password is incorrect)',
        403: 'User is authorized, but access is forbidden. ',
        404: 'The request sent is for a record that does not exist, the server does not perform any operation. ',
        406: 'The requested is not available. ',
        410: 'The requested resource is permanently deleted and will not be obtained again. ',
        422: 'When creating an object, a validation error occurred. ',
        500: 'The server has an error, please check the server. ',
        502: 'Gateway error',
        503: 'The service is unavailable, the server is temporarily overloaded or maintained. ',
        504: 'Gateway timeout',
        21336: 'Requiresaccess_token',
    },
    error: {
        delete_failed: 'Deleted failed!',
        operate_failed: 'Operated failed!',
        request_too_frequent: 'Request out of rate limit, please try again later!',
        captcha_code_error: 'Captcha error!',
        send_code_error: 'The time interval from last request is too short. Please try again later!',
        captcha_send_failed: 'Captcha code sent failed，please try again later!',
        phone_already_exist: 'Phone number already exists!',
        organization_already_exist: 'Organization already exists!',
        account_or_password_error: 'Username or password error!',
        user_not_exist: 'User does not exist!',
        please_input_email: 'Please enter email!',
        please_input_correct_email: 'Please enter the correct email!',
        please_input_phone_number: 'Please enter phone number!',
        please_input_correct_phone_number: 'Please enter the correct phone number!',
        please_input_organ_name: 'Please enter the organization name!',
        please_input_captcha: 'Please enter captcha!',
        please_input_pwd: 'Please enter password!',
        old_password_error: 'Old password error!',
        old_pwd_cannot_same_old_pwd: 'The new password cannot be the same as the old password!',
        please_input_old_pwd: 'Please enter old password!',
        please_input_new_pwd: 'Please enter new password!',
        please_sure_pwd: 'Please make sure password!',
        entered_passwords_differ: 'Entered passwords differ!',
        username_not_exceed_20: 'The user name should not exceed 20!',
        username_cannot_be_empty: 'Username cannot be empty!',
        please_input_gateway_name: 'Please enter gateway name!',
        gateway_name_already_exist: 'Gateway name already exists!',
        please_input_correct_serial_number: 'Please enter the correct serial number!',
        serial_number_already_exist: 'Serial number already exists!',
        unselected_firmware: 'Unselected firmware!',
        email_already_exist: 'Email already exists!',
        please_input_username: 'Please enter username!',
        email_error: 'The Email format error!',
        firmware_error: 'The Firmware format error!',
        please_upload_firmware: 'Please upload firmware!',
        please_input_template_name: 'Please enter template name!',
        please_upload_config_file: 'Please upload config file!',
        download_failed_please_download_again: 'Download failed! Please download again',
        exception_403: 'Sorry，You have no permission to access the page',
        exception_404: 'Sorry，The page you are visiting does not exist',
        exception_500: 'Sorry，Internal Server Error',
        request_error: 'Request Error',
        please_select_file: 'Please select a file!',
        200: 'The request is OK.',
        201: 'The request has been fulfilled, and a new resource is created.',
        202: 'The request has been accepted for processing, but the processing has not been completed.',
        204: 'The request has been successfully processed, but is not returning any content.',
        400: 'The request cannot be fulfilled due to bad syntax.',
        401: 'Operation is not permitted(Token, user name, password error).',
        403: 'The request was a legal request, but the server is refusing to respond to it',
        404: 'The requested page could not be found but may be available again in the future.',
        406: 'The server can only generate a response that is not accepted by the client',
        410: 'The requested page is no longer available',
        422: 'The server understands the content type of the request entity, and the syntax of the request entity is correct but was unable to process the contained instructions.',
        500: 'Internal Server Error',
        502: 'Bad Gateway',
        503: 'The server is currently unavailable (overloaded or down)',
        504: 'Gateway Timeout',
        10001: 'System error',
        10002: 'Network error',
        10004: 'IP limit',
        10005: 'Permission denied: high level appkey required',
        10006: 'Request out of rate limit, please try again later',
        10008: 'Param error: see doc for more info',
        10009: 'Too many pending tasks: system is busy',
        10012: 'Illegal request',
        10013: 'Invalid user',
        10014: 'Insufficient app privileges',
        10016: 'Missing required parameter: see doc for more info',
        10017: 'Parameter’s value invalid: see doc for more info',
        10018: 'HTTP body format error: see doc for more info',
        10021: 'HTTP method is not supported for this request',
        10022: 'Request out of rate limit, please try again later',
        10024: 'Request out of rate limit, please try again later',
        10025: 'Request out of rate limit, please try again later',
        10026: 'Organization requests out of rate limit',
        100027: 'Duplicate variable ids ({0})',
        2960006: 'Batch Update Mobile Ok.',
        20002: 'User does not exist',
        20003: 'User does not exists',
        20004: 'Role does not exists',
        20005: 'Resource does not allowed',
        20006: 'Resource does not exist',
        20007: 'Resource ({name}) already exists',
        20009: 'Organization does not approved',
        20010: 'Organization approves failed',
        20011: 'Organization does not activated',
        20012: 'Text too long',
        20013: 'Captcha error',
        20014: 'SMS code error',
        20016: 'Frequent operation',
        20020: 'Site has been other gateway has',
        21301: 'Auth failed',
        21302: 'Username or password error',
        21303: 'Username and pwd auth out of rate limit',
        21304: 'Account {username} be locked，please wait {lockedTime} seconds',
        21305: 'User login required',
        21306: 'Captcha code error',
        21307: 'User forbidden,pleasse contact admin',
        21311: 'App key does not exist',
        21321: 'Applications over the unaudited use restrictions',
        21330: 'Access denied',
        21332: 'Refresh token error',
        21333: 'Refresh token expired',
        21334: 'Code error',
        21335: 'Code expired',
        21336: 'Token error',
        21337: 'Server token error',
        21338: 'Server token expired',
        1801: 'Http connection refused',
        21802: 'Http response from timeout',
        21803: 'Http invalid response',
        21804: 'Http response bad status code from',
        22001: 'File read error file',
        22002: 'File type inconformity',
        22003: 'File content error',
        23001: 'Create channel failed',
        23002: 'Channel already created',
        24001: 'Device appoint model error',
        24002: 'Model variable file format error',
        25001: 'Device upper limit: call web admin for more info',
        25003: 'Device key already exists!',
        25004: 'Device key does not exists!',
        30002: 'Database connection error',
        30003: 'Database operation error',
        32002: 'The alias ({0}) contain some special characters',
        32001: 'The alias ({0}) already exists',
        40001: 'Reach the upper limit of the number APIKeys',
        30007: 'The length of the name ({0}) exceeds the limit of 30',
        30008: 'The name ({0}) contains illegal characters',
        31001: 'You must provide the ({name}) at line ({line}) in Excel',
        31002: 'The value ({name}) is same on line ({line}) in Excel',
        21322: 'Resource name ({name}) already exists',
        20107: 'SerialNumber ({name}) already exists',
        30009: 'The SerialNumber ({name}) format error,please input the serial number of the gateway 15',
        30011: 'The IMSI ({0}) format error',
        30010: 'The mobileNum ({0}) format error',
        31003: 'The Excel rows out of limit({0})',
    },

}